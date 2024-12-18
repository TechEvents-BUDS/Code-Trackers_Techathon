import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const CATEGORIES = ['Books', 'Notes', 'Electronics', 'Furniture', 'Clothing', 'Other'];
const CONDITIONS = ['New', 'Like New', 'Good', 'Fair', 'Poor'];

export default function CreateListingForm() {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    price: '',
    condition: '',
    description: '',
    image: null,
    userId:'67627579ceb49a3d0db5da65'
    
  });

  const [backendError, setBackendError] = useState(null);
  const [imageError, setImageError] = useState(null);
  const [formError, setFormError] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'price' && (value <= 0 || value.startsWith('0'))) {
      e.target.value = '';
      return;
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    setImageError(null);
    const file = e.target.files[0];

    if (file.size <= 3 * 1024 * 1024) {
      setFormData((prevData) => ({
        ...prevData,
        image: file,
      }));
    } else {
      e.target.value = '';
      setImageError('File must be less than 3MB in size');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);
    setBackendError(null);

    // Validation check
    if (!formData.title || !formData.category || !formData.price || !formData.condition || !formData.description || !formData.image) {
      return setFormError('All fields are required');
    }

    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('category', formData.category);
      data.append('price', formData.price);
      data.append('condition', formData.condition);
      data.append('description', formData.description);
      data.append('image', formData.image);
      data.append('userId', formData.userId);

      const response = await axios.post('http://localhost:8000/user/api/addProduct', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Listing Created Successfully');
      navigate('/marketplace');
    } catch (error) {
      setBackendError(error.response?.data.message || 'Something went wrong');
      console.error('Error:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-4">
      <h1 className="text-3xl font-bold mb-6">Create a New Listing</h1>
      <Card className="w-full max-w-2xl mx-auto">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>List Your Item</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Enter the title of your item"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="category">Category</Label>
                <Select name="category" value={formData.category} onValueChange={(value) => handleSelectChange('category', value)} required>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {CATEGORIES.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="price">Price (PKR)</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  placeholder="Enter the price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="condition">Condition</Label>
                <Select name="condition" value={formData.condition} onValueChange={(value) => handleSelectChange('condition', value)} required>
                  <SelectTrigger id="condition">
                    <SelectValue placeholder="Select the condition" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {CONDITIONS.map((condition) => (
                      <SelectItem key={condition} value={condition}>
                        {condition}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe your item"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="image">
                  Images <span className="text-red-500">(only supports png/jpeg/jpg format)</span>
                </Label>
                <Input id="image" name="image" type="file" accept="image/png, image/jpeg, image/jpg" onChange={handleImageUpload} />
              </div>
              {imageError && <span className="text-red-500">{imageError}</span>}
              {formError && <span className="text-red-500">{formError}</span>}
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit">
              Create Listing
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
