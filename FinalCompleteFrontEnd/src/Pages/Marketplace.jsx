import { useEffect, useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";

function Marketplace() {
  const CATEGORIES = ['All', 'Books', 'Electronics', 'Furniture', 'Clothing', 'Other'];
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 200000]);
  const [listings, setListings] = useState([]); // State for fetched listings
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8000/user/api/showProduct');
        if (response.data.success) {
          console.log(response.data.products)
          setListings(response.data.products);
        } else {
          setError(response.data.message || "Failed to fetch products.");
        }
      } catch (err) {
        setError(err.response?.data?.message || "An error occurred while fetching products.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Filter products based on search, category, and price
  const filteredListings = listings.filter(
    (item) =>
      (searchTerm === '' || item.title.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (category === 'All' || item.category === category) &&
      (item.price >= priceRange[0] && item.price <= priceRange[1])
  );

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold mb-4">Marketplace</h1>
        <Link to="/marketplace/create">
          <Button>Create New Listing</Button>
        </Link>
      </div>
      <div>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-grow relative">
            <Input
              type="text"
              placeholder="Search listings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Price:</span>
            <Slider
              min={0}
              max={200000}
              step={500}
              value={priceRange}
              onValueChange={setPriceRange}
              className="w-[200px]"
            />
            <span className="text-sm">
              PKR {priceRange[0]} - PKR {priceRange[1]}
            </span>
          </div>
        </div>

        {loading ? (
          <p>Loading products...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : filteredListings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.map((item) => (
              <Card key={item._id} className="flex flex-col">
                <CardHeader>
                <img
                src={`http://localhost:8000${item.image}`}
                alt={item.title}
                className="w-full h-48 object-cover mb-4 rounded-md"
              />
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-lg">PKR {item.price}</span>
                    <Badge>{item.category}</Badge>
                  </div>
                  <p className="text-sm text-gray-500">Condition: {item.condition}</p>
                  <p className="text-sm text-gray-500">Seller: {item.userId?.firstName} {item.userId?.lastName}</p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Contact Seller</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <p>No products found matching the filters.</p>
        )}
      </div>
    </div>
  );
}

export default Marketplace;
