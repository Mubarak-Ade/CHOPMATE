export const Footer = () => {
  return (
    <footer className="border-t border-black/6 bg-white/75 px-6 pb-8 pt-16 lg:px-10">
      <div className="section-shell grid grid-cols-1 gap-12 md:grid-cols-4">
        <div className="col-span-2">
          <div className="mb-4 flex items-center gap-2">
            <span className="text-2xl font-bold text-gray-900">Chop<span className="text-red-500">MATE</span></span>
          </div>
          <p className="max-w-sm leading-relaxed text-gray-500">
            The leading platform for modern restaurant operations. 
            We help kitchens automate the complex so they can focus on the food.
          </p>
        </div>

        <div>
          <h3 className="font-black text-gray-900 mb-4 uppercase tracking-wider text-sm">Product</h3>
          <ul className="space-y-3 text-gray-500 font-medium">
            <li className="hover:text-gray-900 cursor-pointer">Features</li>
            <li className="hover:text-gray-900 cursor-pointer">Pricing</li>
            <li className="hover:text-gray-900 cursor-pointer">Integrations</li>
          </ul>
        </div>

        <div>
          <h3 className="font-black text-gray-900 mb-4 uppercase tracking-wider text-sm">Support</h3>
          <ul className="space-y-3 text-gray-500 font-medium">
            <li className="hover:text-gray-900 cursor-pointer">Help Center</li>
            <li className="hover:text-gray-900 cursor-pointer">Guides</li>
            <li className="hover:text-gray-900 cursor-pointer">Status</li>
          </ul>
        </div>
      </div>

      <div className="section-shell mt-16 border-t border-gray-100 pt-8">
        <p className="text-gray-500 font-semibold text-sm">
          © 2026 ChopMATE System. Built for Modern Kitchens.
        </p>
      </div>
    </footer>
  );
};
