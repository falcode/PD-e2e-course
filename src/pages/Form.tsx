import React, { useState } from 'react';

const UserPreferencesForm: React.FC = () => {
  const [experience, setExperience] = useState('');
  const [newsletter, setNewsletter] = useState(false);
  const [topics, setTopics] = useState<{ [key: string]: boolean }>({
    react: false,
    vue: false,
    angular: false,
  });

  return (
      <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-md shadow-md font-sans">
        <h2 className="text-2xl font-bold mb-6 text-center">User Preferences</h2>
        <form className="space-y-6" aria-label="preferences-form">
          {/* Experience Level (Radio) */}
          <fieldset className="space-y-2">
            <legend className="font-medium text-gray-700">How experienced are you with frontend development?</legend>
            <div className="space-y-1">
              <label className="flex items-center gap-2">
                <input
                    type="radio"
                    name="experience"
                    value="beginner"
                    checked={experience === 'beginner'}
                    onChange={() => setExperience('beginner')}
                />
                Beginner
              </label>
              <label className="flex items-center gap-2">
                <input
                    type="radio"
                    name="experience"
                    value="intermediate"
                    checked={experience === 'intermediate'}
                    onChange={() => setExperience('intermediate')}
                />
                Intermediate
              </label>
              <label className="flex items-center gap-2">
                <input
                    type="radio"
                    name="experience"
                    value="advanced"
                    checked={experience === 'advanced'}
                    onChange={() => setExperience('advanced')}
                />
                Advanced
              </label>
            </div>
          </fieldset>

          {/* Dynamic Text Based on Experience */}
          {experience && (
              <div className="bg-blue-50 text-blue-800 p-4 rounded-md">
                {experience === 'beginner' && <p>Welcome! We recommend starting with basic tutorials.</p>}
                {experience === 'intermediate' && <p>Great! You might enjoy building projects.</p>}
                {experience === 'advanced' && <p>Awesome! You can contribute to open source or mentor others.</p>}
              </div>
          )}

          {/* Newsletter Checkbox */}
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input
                  type="checkbox"
                  checked={newsletter}
                  onChange={() => setNewsletter((prev) => !prev)}
              />
              Subscribe to newsletter
            </label>
          </div>

          {/* Conditional Topics Checkboxes */}
          {newsletter && (
              <div className="bg-gray-100 p-4 rounded-md space-y-2">
                <p className="text-sm text-gray-700">Select the topics you are interested in:</p>
                <label className="flex items-center gap-2">
                  <input
                      type="checkbox"
                      checked={topics.react}
                      onChange={() => setTopics({ ...topics, react: !topics.react })}
                  />
                  React
                </label>
                <label className="flex items-center gap-2">
                  <input
                      type="checkbox"
                      checked={topics.vue}
                      onChange={() => setTopics({ ...topics, vue: !topics.vue })}
                  />
                  Vue
                </label>
                <label className="flex items-center gap-2">
                  <input
                      type="checkbox"
                      checked={topics.angular}
                      onChange={() => setTopics({ ...topics, angular: !topics.angular })}
                  />
                  Angular
                </label>
              </div>
          )}
        </form>
      </div>
  );
};

export default UserPreferencesForm;
