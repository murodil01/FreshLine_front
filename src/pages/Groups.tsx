import React from "react";

interface Group {
  id: number;
  name: string;
  description: string;
}

const groupsData: Group[] = [
  { id: 1, name: "Frontend guruh N-88", description: "React, Vue, Angular" },
  { id: 2, name: "Backend guruh N-77", description: "Node.js, Django, Laravel" },
  { id: 3, name: "Mobile Development M-66", description: "React Native, Flutter" },
  { id: 4, name: "Data Science D-55", description: "Python, ML, AI" },
  { id: 5, name: "DevOps D-44", description: "Docker, Kubernetes, CI/CD" },
  { id: 6, name: "UI/UX Design U-33", description: "Figma, Adobe XD" },
  { id: 7, name: "Cybersecurity C-22", description: "Network, Pentesting" },
  { id: 8, name: "Game Development G-11", description: "Unity, Unreal Engine" },
];

const Groups: React.FC = () => {
  return (
    <div className="p-6 bg-black min-h-screen border-l-2">
      <h1 className="text-3xl font-bold text-white mb-8 border-b-2 pb-4">
        Guruhlar bo'limiga xush kelibsiz
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {groupsData.map((group) => (
          <div
            key={group.id}
            className="bg-gray-900 rounded-lg p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
          >
            <h3 className="text-xl font-semibold text-white mb-2">{group.name}</h3>
            <p className="text-gray-400">{group.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Groups;
