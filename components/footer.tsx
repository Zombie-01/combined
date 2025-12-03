export default function Footer() {
  return (
    <footer className="mt-16 bg-gray-900 py-12 text-white">
      <div className="mx-auto grid max-w-5xl grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] gap-8 px-4 pb-8">
        <div>
          <h4 className="mb-2 text-xl font-semibold">Unified Admin</h4>
          <p className="text-sm text-gray-400">
            Manage Portfolio, Travel, and Yoga websites from one place
          </p>
        </div>

        <div>
          <h5 className="mb-3 font-semibold">Sites</h5>
          <ul className="space-y-2">
            <li>
              <a
                href="#portfolio"
                className="text-sm text-gray-400 transition-colors hover:text-white">
                Portfolio
              </a>
            </li>
            <li>
              <a
                href="#travel"
                className="text-sm text-gray-400 transition-colors hover:text-white">
                Travel
              </a>
            </li>
            <li>
              <a
                href="#yoga"
                className="text-sm text-gray-400 transition-colors hover:text-white">
                Yoga
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h5 className="mb-3 font-semibold">Links</h5>
          <ul className="space-y-2">
            <li>
              <a
                href="/auth/login"
                className="text-sm text-gray-400 transition-colors hover:text-white">
                Login
              </a>
            </li>
            <li>
              <a
                href="/auth/register"
                className="text-sm text-gray-400 transition-colors hover:text-white">
                Register
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h5 className="mb-3 font-semibold">Legal</h5>
          <ul className="space-y-2">
            <li>
              <a
                href="#privacy"
                className="text-sm text-gray-400 transition-colors hover:text-white">
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="#terms"
                className="text-sm text-gray-400 transition-colors hover:text-white">
                Terms of Service
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-700 px-4 py-8 text-center">
        <p className="text-sm text-gray-500">
          &copy; 2024 Unified Admin. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
