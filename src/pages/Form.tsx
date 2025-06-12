import React, { useEffect, useState } from 'react';

type ExperienceLevel = {
  id: string;
  label: string;
  description: string;
  suggestedTopics?: string[];
};

type Topic = {
  id: string;
  label: string;
};

type PreferencesData = {
  experienceLevels: ExperienceLevel[];
  topics: Topic[];
};

const UserPreferencesForm: React.FC = () => {
  const [data, setData] = useState<PreferencesData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Error state
  const [experience, setExperience] = useState('');
  const [topics, setTopics] = useState<string[]>([]);
  const [form, setForm] = useState({ level: '', topics: [''], email: '' });
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    setIsLoading(true);
    setError(null); // Reset error state
    fetch('http://localhost:3040/preferences-options')
        .then((res) => {
          if (!res.ok) {
            throw new Error('Failed to fetch preferences');
          }
          return res.json();
        })
        .then((data: PreferencesData) => {
          setData(data);
          setIsLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setIsLoading(false);
        });
  }, []);

  const selectedExperience = data?.experienceLevels.find((e) => e.id === experience);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { email } = form;

    if (email === 'user@example.com') {
      setStatus('success');
    } else {
      setStatus('error');
    }
  };

  return (
      <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-md shadow-md font-sans">
        <h2 className="text-2xl font-bold mb-6 text-center">User Preferences</h2>
        {isLoading ? (
            <p data-testid="loading" className="text-center text-gray-500">Loading form...</p>
        ) : error ? (
            <a href="/form"><p data-testid="error" className="text-center text-red-500">Error at loading page, please click to reload</p></a>
        ) : (
            <form className="space-y-6" aria-label="preferences-form" onSubmit={handleSubmit}>
              <fieldset className="space-y-2">
                <legend className="font-medium text-gray-700">
                  How experienced are you with frontend development?
                </legend>
                <div className="space-y-1">
                  {data?.experienceLevels.map((level) => (
                      <label key={level.id} className="flex items-center gap-2">
                        <input
                            type="radio"
                            name="experience"
                            value={level.id}
                            checked={experience === level.id}
                            onChange={() => {
                              setExperience(level.id);
                              setTopics([]);
                            }}
                        />
                        {level.label}
                      </label>
                  ))}
                </div>
              </fieldset>

              {selectedExperience && (
                  <div className="bg-blue-50 text-blue-800 p-4 rounded-md">
                    <p>{selectedExperience.description}</p>
                  </div>
              )}

              {selectedExperience && (
                  <div className="bg-gray-100 p-4 rounded-md space-y-4">
                    <p className="text-sm text-gray-700">Select the topics you are interested in:</p>
                    <div>
                      {data?.topics
                          .filter((topic) =>
                              selectedExperience.suggestedTopics?.some((sugTopic) => sugTopic === topic.id)
                          )
                          .map((topic) => (
                              <label key={topic.id} className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    onChange={() =>
                                        setTopics((prev) =>
                                            prev.includes(topic.id)
                                                ? prev.filter((id) => id !== topic.id)
                                                : [...prev, topic.id]
                                        )
                                    }
                                />
                                {topic.label}
                              </label>
                          ))}
                    </div>
                  </div>
              )}

              {selectedExperience && topics.length > 0 && (
                  <>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Email Address"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                    />
                    <button
                        type="submit"
                        className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                      Submit
                    </button>
                  </>
              )}

              {status === 'success' && (
                  <h1 className="text-green-700">Congratulations! you have been subscribed to our newsletter</h1>
              )}
              {status === 'error' && (
                  <h1 className="text-red-600">Error: Invalid email address</h1>
              )}
            </form>
        )}
      </div>
  );
};

export default UserPreferencesForm;