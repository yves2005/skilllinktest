import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

export const AiSkillSuggestions = ({ inputId }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Simulate AI generated suggestions based on "context"
    const contextSuggestions = [
      "React", "Node.js", "Tailwind CSS", "UI/UX Design", "Copywriting"
    ];
    setSuggestions(contextSuggestions);
  }, []);

  const handleSuggestionClick = (skill) => {
    const input = document.getElementById(inputId);
    if (input) {
      input.value = skill;
      // Trigger input event to update filters
      const event = new Event('input', { bubbles: true });
      input.dispatchEvent(event);
    }
  };

  if (!isVisible || suggestions.length === 0) return null;

  return (
    <div className="mt-2 p-3 bg-indigo-50/50 border border-indigo-100 rounded-xl relative">
      <div className="flex items-center text-xs font-semibold text-indigo-800 mb-2">
        <Sparkles className="w-3.5 h-3.5 mr-1.5 text-indigo-500" />
        Suggestions IA pour vous
      </div>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((skill, index) => (
          <button
            key={index}
            onClick={() => handleSuggestionClick(skill)}
            className="text-xs font-medium text-slate-600 bg-white border border-slate-200 px-2.5 py-1 rounded-full hover:border-indigo-300 hover:text-indigo-600 transition shadow-sm"
          >
            {skill}
          </button>
        ))}
      </div>
    </div>
  );
};
