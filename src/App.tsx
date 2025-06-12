import './App.css';

function App() {
  return (
      <div className="min-h-screen bg-gray-50 p-8 text-gray-800">
        <h1 className="text-4xl font-bold mb-6 text-center">🧪 Testing Workshop</h1>

        {/* Images Section */}
        <section className="flex flex-col lg:flex-row items-center justify-center gap-6 mb-10">
          <div className="flex-1 max-w-[700px]">
            <img
                src="/pyramid.png"
                alt="Testing Pyramid"
                className="rounded-xl shadow-lg w-full"
            />
            <p className="mt-4 text-center font-medium">Testing Pyramid</p>
          </div>

          <div className="flex-1 max-w-md">
            <img
                src="/trophy.png"
                alt="Testing Trophy"
                className="rounded-xl shadow-lg w-full"
            />
            <p className="mt-4 text-center font-medium">Testing Trophy</p>
          </div>
        </section>

        {/* Description */}
        <section className="max-w-3xl mx-auto text-lg leading-relaxed mb-10">
          <p>
            In this hands-on workshop, we’ll explore two popular testing strategies and implement
            real tests in a modern React + TypeScript app using <strong>Playwright</strong>.
          </p>
          <p className="mt-4">
            We'll focus entirely on <em>end-to-end testing</em>, using the real UI and network interactions.
            The workshop is designed to give you practical experience and last about 90 minutes.
          </p>
        </section>

        {/* Features */}
        <section className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4">📦 App Features</h2>
          <ul className="list-disc list-inside space-y-3 text-lg">
            <li>
              <a href="/form"><strong>User Preferences Form</strong></a> — with dynamic content and interactivity
              <span className="text-sm text-gray-500"> (tested with Playwright)</span>
            </li>
          </ul>
        </section>

        {/* Workshop Flow */}
        <section className="max-w-3xl mx-auto mt-12">
          <h2 className="text-2xl font-semibold mb-4">⏱️ Workshop Flow</h2>
          <ol className="list-decimal list-inside space-y-3 text-lg">
            <li>Intro to E2E testing and Playwright</li>
            <li>Explore the <code>/form</code> UI and underlying API</li>
            <li>Write E2E tests for:
              <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                <li>Loading and error states</li>
                <li>Basic interactions (radio, checkbox, conditional logic)</li>
                <li>Edge cases (invalid flows, toggling state, etc.)</li>
                <li>📦 Bonus: Intercepting responses, mocking network delays</li>
              </ul>
            </li>
            <li>Q&A / Wrap-up</li>
          </ol>
        </section>

        {/* Setup */}
        <section className="max-w-3xl mx-auto mt-12">
          <h2 className="text-2xl font-semibold mb-4">⚙️ Setup Instructions</h2>
          <ul className="list-disc list-inside text-lg space-y-2">
            <li>Run <code>npm install</code> to install dependencies</li>
            <li>Start the fake backend with <code>npm run start:server</code></li>
            <li>Launch the frontend with <code>npm run dev</code></li>
            <li>Navigate to <code>/form</code> to begin testing</li>
          </ul>
        </section>
      </div>
  );
}

export default App;
