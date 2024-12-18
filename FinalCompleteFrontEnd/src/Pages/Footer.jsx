export default function Footer() {
    return (
      <footer className="bg-black text-white py-4 md:py-8  ">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">CampusConnect</h3>
              <p className="text-sm">Connecting students, simplifying campus life.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li className="text-sm hover:text-white hover:cursor-pointer">Marketplace</li>
                <li className="text-sm hover:text-white hover:cursor-pointer">Carpool</li>
                <li className="text-sm hover:text-white hover:cursor-pointer">Events</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li  className="text-sm hover:text-white hover:cursor-pointer">FAQ</li>
                <li className="text-sm hover:text-white hover:cursor-pointer">Contact Us</li>
                <li className="text-sm hover:text-white hover:cursor-pointer">Terms of Service</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect</h4>
              <ul className="space-y-2">
                <li className="text-sm hover:cursor-pointer">Facebook</li>
                <li className="text-sm hover:cursor-pointer">Twitter</li>
                <li className="text-sm hover:cursor-pointer">Instagram</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm">
            © 2024 CampusConnect. All rights reserved.
          </div>
        </div>
      </footer>
    )
  }
  