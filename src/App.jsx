import React, { useState, useEffect } from "react";
import Login from "./login";

const SKILLS = [
  { id: 1, name: "Guitar", icon: "🎸", color: "bg-zinc-900" },
  { id: 2, name: "Coding", icon: "💻", color: "bg-zinc-900" },
  { id: 3, name: "Math", icon: "📐", color: "bg-zinc-900" },
  { id: 4, name: "Design", icon: "🎨", color: "bg-zinc-900" },
  { id: 5, name: "Spanish", icon: "🇪🇸", color: "bg-zinc-900" },
  { id: 6, name: "Cooking", icon: "👨‍🍳", color: "bg-zinc-900" },
];

const TUTORS = {
  Guitar: [
    {
      name: "Sarah Mitchell",
      bio: "Professional guitarist with 10 years teaching experience",
      match: 87,
      status: "online",
      location: "Los Angeles, CA",
      rating: 4.9,
    },
    {
      name: "James Rodriguez",
      bio: "Jazz musician specializing in acoustic techniques",
      match: 92,
      status: "online",
      location: "New York, NY",
      rating: 4.8,
    },
    {
      name: "Emma Wilson",
      bio: "Rock and blues guitar instructor",
      match: 78,
      status: "online",
      location: "Austin, TX",
      rating: 4.7,
    },
  ],
  Coding: [
    {
      name: "Alex Chen",
      bio: "Full-stack developer teaching JavaScript and React",
      match: 95,
      status: "online",
      location: "San Francisco, CA",
      rating: 5.0,
    },
    {
      name: "Maya Patel",
      bio: "Python expert with focus on data science",
      match: 88,
      status: "online",
      location: "Seattle, WA",
      rating: 4.9,
    },
    {
      name: "David Kim",
      bio: "Software engineer specializing in web development",
      match: 91,
      status: "online",
      location: "Boston, MA",
      rating: 4.8,
    },
  ],
  Math: [
    {
      name: "Dr. Lisa Brown",
      bio: "Mathematics professor with 15 years experience",
      match: 89,
      status: "online",
      location: "Chicago, IL",
      rating: 4.9,
    },
    {
      name: "Robert Taylor",
      bio: "Calculus and algebra specialist",
      match: 84,
      status: "online",
      location: "Denver, CO",
      rating: 4.7,
    },
    {
      name: "Jennifer Lee",
      bio: "Statistics and probability tutor",
      match: 93,
      status: "online",
      location: "Portland, OR",
      rating: 5.0,
    },
  ],
  Design: [
    {
      name: "Chris Anderson",
      bio: "UX/UI designer with award-winning portfolio",
      match: 90,
      status: "online",
      location: "San Diego, CA",
      rating: 4.9,
    },
    {
      name: "Olivia Martinez",
      bio: "Graphic designer teaching Adobe Creative Suite",
      match: 86,
      status: "online",
      location: "Miami, FL",
      rating: 4.8,
    },
    {
      name: "Sophia Green",
      bio: "Product designer focusing on user-centered design",
      match: 94,
      status: "online",
      location: "Brooklyn, NY",
      rating: 5.0,
    },
  ],
  Spanish: [
    {
      name: "Carlos Gomez",
      bio: "Native Spanish speaker from Madrid",
      match: 91,
      status: "online",
      location: "Madrid, Spain",
      rating: 4.8,
    },
    {
      name: "Isabella Torres",
      bio: "Bilingual educator specializing in conversational Spanish",
      match: 88,
      status: "online",
      location: "Barcelona, Spain",
      rating: 4.9,
    },
    {
      name: "Miguel Santos",
      bio: "Spanish literature and culture expert",
      match: 85,
      status: "online",
      location: "Mexico City, MX",
      rating: 4.7,
    },
  ],
  Cooking: [
    {
      name: "Chef Maria Romano",
      bio: "Italian cuisine specialist and culinary instructor",
      match: 92,
      status: "online",
      location: "Rome, Italy",
      rating: 5.0,
    },
    {
      name: "Tom Harper",
      bio: "Professional chef teaching French techniques",
      match: 87,
      status: "online",
      location: "Paris, France",
      rating: 4.8,
    },
    {
      name: "Nina Johnson",
      bio: "Pastry chef and baking instructor",
      match: 90,
      status: "online",
      location: "London, UK",
      rating: 4.9,
    },
  ],
};

const CHAT_MESSAGES = [
  "Hey! Ready to dive in? 👋",
  "Let's make learning fun!",
  "Excited to teach you today!",
  "Welcome! Let's get started 🚀",
  "Hi there! Nice to meet you!",
];

const RANDOM_STATS = [
  { label: "Active learners", value: "2,847" },
  { label: "Sessions today", value: "1,203" },
  { label: "Tutors online", value: "156" },
  { label: "Avg. rating", value: "4.9★" },
];

export default function App() {
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [tutorIndex, setTutorIndex] = useState(0);
  const [credits, setCredits] = useState(50);
  const [inSession, setInSession] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null);
  const [userData, setUserData] = useState(null);

  // Check for existing session on mount
  useEffect(() => {
    const currentUser = localStorage.getItem("skillsnap_current_user");
    if (currentUser) {
      const user = JSON.parse(currentUser);
      setIsLoggedIn(true);
      setUserType(user.userType);
      setUserData(user);
    }
  }, []);

  const handleLogin = (type, user) => {
    setUserType(type);
    setUserData(user);
    setIsLoggedIn(true);
    setShowLogin(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("skillsnap_current_user");
    setIsLoggedIn(false);
    setUserType(null);
    setUserData(null);
    setSelectedSkill(null);
    setInSession(false);
  };

  const handleSkillSelect = (skill) => {
    if (!isLoggedIn) {
      setShowLogin(true);
      return;
    }

    setSelectedSkill(skill);
    setTutorIndex(0);
    setInSession(false);
    setIsConnecting(true);
    setChatMessage(
      CHAT_MESSAGES[Math.floor(Math.random() * CHAT_MESSAGES.length)],
    );

    setTimeout(() => {
      setIsConnecting(false);
    }, 1500);
  };

  const handleSkipTutor = () => {
    const tutorList = TUTORS[selectedSkill.name];
    setIsConnecting(true);
    setChatMessage("");

    setTimeout(() => {
      setTutorIndex((tutorIndex + 1) % tutorList.length);
      setChatMessage(
        CHAT_MESSAGES[Math.floor(Math.random() * CHAT_MESSAGES.length)],
      );
      setIsConnecting(false);
    }, 1200);
  };

  const handleContinueSession = () => {
    setCredits(credits - 5);
    setInSession(true);
  };

  const handleBackToSkills = () => {
    setSelectedSkill(null);
    setInSession(false);
    setChatMessage("");
  };

  const currentTutor = selectedSkill
    ? TUTORS[selectedSkill.name][tutorIndex]
    : null;

  return (
    <div className="min-h-screen bg-black">
      <header className="border-b border-zinc-800 bg-black">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white flex items-center justify-center font-black text-black text-lg">
              S
            </div>
            <div>
              <h1 className="text-xl font-black text-white tracking-tight">
                SkillSnap
              </h1>
              <p className="text-xs text-zinc-600">Instant tutoring</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 px-4 py-2">
              <span className="text-sm font-medium text-zinc-500">Credits</span>
              <span className="text-xl font-bold text-white">{credits}</span>
            </div>
            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-zinc-500">
                  {userData?.name} ({userType === "tutor" ? "Tutor" : "Learner"}
                  )
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-zinc-800 text-white px-5 py-2 font-semibold hover:bg-zinc-700 transition-colors border border-zinc-700"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowLogin(true)}
                className="bg-white text-black px-5 py-2 font-semibold hover:bg-zinc-200 transition-colors"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        {!selectedSkill ? (
          <div>
            <div className="mb-8">
              <h2 className="text-5xl font-black text-white mb-4 tracking-tight">
                What do you want to learn?
              </h2>
              <p className="text-zinc-500 text-lg mb-6">
                {isLoggedIn
                  ? "Choose a skill and get matched with tutors instantly"
                  : "Login to start learning with expert tutors"}
              </p>

              <div className="flex gap-8 mb-12">
                {RANDOM_STATS.map((stat, idx) => (
                  <div key={idx} className="text-left">
                    <div className="text-2xl font-black text-white">
                      {stat.value}
                    </div>
                    <div className="text-xs text-zinc-600 uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {!isLoggedIn && (
              <div className="bg-zinc-900 border border-zinc-800 p-6 mb-6">
                <p className="text-white font-semibold mb-2">
                  🔒 Login Required
                </p>
                <p className="text-zinc-500 text-sm mb-4">
                  Please login or create an account to browse tutors and start
                  learning
                </p>
                <button
                  onClick={() => setShowLogin(true)}
                  className="bg-white text-black px-6 py-3 font-bold hover:bg-zinc-200 transition-colors"
                >
                  Login / Sign Up
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {SKILLS.map((skill) => (
                <button
                  key={skill.id}
                  onClick={() => handleSkillSelect(skill)}
                  className={`${skill.color} p-8 border border-zinc-800 transition-all relative ${
                    isLoggedIn
                      ? "hover:border-white hover:bg-zinc-800 cursor-pointer"
                      : "opacity-50 cursor-not-allowed"
                  }`}
                >
                  {!isLoggedIn && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60">
                      <span className="text-white font-bold text-sm">
                        🔒 Login Required
                      </span>
                    </div>
                  )}
                  <div className="text-6xl mb-3">{skill.icon}</div>
                  <h3 className="text-xl font-bold text-white">{skill.name}</h3>
                  <p className="text-sm text-zinc-600 mt-2">Find tutors</p>
                </button>
              ))}
            </div>

            <div className="mt-12 bg-zinc-900 border border-zinc-800 p-6">
              <h3 className="text-lg font-bold text-white mb-4">
                How it works
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-white flex items-center justify-center text-black font-bold shrink-0">
                    1
                  </div>
                  <div>
                    <div className="font-semibold text-white">Choose skill</div>
                    <div className="text-sm text-zinc-600">
                      Pick what you want to learn
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-white flex items-center justify-center text-black font-bold shrink-0">
                    2
                  </div>
                  <div>
                    <div className="font-semibold text-white">
                      Browse tutors
                    </div>
                    <div className="text-sm text-zinc-600">
                      Free exploration mode
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-white flex items-center justify-center text-black font-bold shrink-0">
                    3
                  </div>
                  <div>
                    <div className="font-semibold text-white">
                      Start learning
                    </div>
                    <div className="text-sm text-zinc-600">
                      Use credits for session
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <button
              onClick={handleBackToSkills}
              className="text-white hover:text-zinc-400 mb-6 flex items-center gap-2 text-lg font-semibold"
            >
              ← Back
            </button>

            {!inSession && !isConnecting && (
              <div className="border-l-4 border-white bg-zinc-900 p-4 mb-6">
                <p className="text-white font-semibold">
                  Free exploration — No credits charged
                </p>
              </div>
            )}

            {inSession && (
              <div className="border-l-4 border-green-500 bg-zinc-900 p-4 mb-6">
                <p className="text-green-500 font-semibold">
                  Session active — 5 credits deducted
                </p>
              </div>
            )}

            <div className="bg-zinc-900 border border-zinc-800 overflow-hidden">
              <div className="bg-black border-b border-zinc-800 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-3xl font-black text-white">
                        {isConnecting ? "Connecting..." : currentTutor.name}
                      </h2>
                      {!isConnecting && (
                        <div className="flex items-center gap-2 bg-green-500 bg-opacity-20 px-3 py-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-xs text-green-500 uppercase tracking-wider font-bold">
                            {currentTutor.status}
                          </span>
                        </div>
                      )}
                    </div>
                    {!isConnecting && (
                      <>
                        <p className="text-zinc-500 mb-3">{currentTutor.bio}</p>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-2 text-zinc-600">
                            <span>📍</span>
                            <span>{currentTutor.location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-zinc-600">
                            <span>⭐</span>
                            <span>{currentTutor.rating}</span>
                          </div>
                          <div className="flex items-center gap-2 text-white">
                            <span>🎯</span>
                            <span className="font-bold">
                              {selectedSkill.name}
                            </span>
                          </div>
                        </div>
                      </>
                    )}
                    {isConnecting && (
                      <p className="text-zinc-600">Finding your match...</p>
                    )}
                  </div>
                  {!isConnecting && (
                    <div className="text-right ml-6">
                      <div className="text-5xl font-black text-white">
                        {currentTutor.match}%
                      </div>
                      <div className="text-sm text-zinc-600 uppercase tracking-wider">
                        Match
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="relative bg-black border-b border-zinc-800 aspect-video flex items-center justify-center">
                {isConnecting ? (
                  <div className="text-center">
                    <div className="text-8xl mb-4">⏳</div>
                    <p className="text-zinc-500 font-semibold text-lg">
                      Connecting...
                    </p>
                    <div className="mt-4 flex justify-center gap-2">
                      <div className="w-3 h-3 bg-white rounded-full animate-bounce"></div>
                      <div
                        className="w-3 h-3 bg-white rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-3 h-3 bg-white rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="w-32 h-32 bg-white flex items-center justify-center mb-6 mx-auto">
                      <div className="text-5xl">🎥</div>
                    </div>
                    <p className="text-white text-xl font-bold mb-2">
                      Live Video Session
                    </p>
                    <p className="text-zinc-600">Session would appear here</p>
                  </div>
                )}
              </div>

              {!isConnecting && chatMessage && (
                <div className="bg-zinc-900 border-b border-zinc-800 p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white flex items-center justify-center text-black font-black text-xl shrink-0">
                      {currentTutor.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="bg-black border border-zinc-800 p-4">
                        <p className="text-white font-medium">{chatMessage}</p>
                      </div>
                      <p className="text-xs text-zinc-600 mt-2">Just now</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="p-6 bg-zinc-900">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-black border border-zinc-800 p-4">
                    <div className="text-2xl font-black text-white">5 min</div>
                    <div className="text-sm text-zinc-600">Response time</div>
                  </div>
                  <div className="bg-black border border-zinc-800 p-4">
                    <div className="text-2xl font-black text-white">247</div>
                    <div className="text-sm text-zinc-600">Sessions done</div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={handleSkipTutor}
                    disabled={inSession || isConnecting}
                    className={`flex-1 px-6 py-4 font-bold transition-all ${
                      inSession || isConnecting
                        ? "bg-zinc-800 text-zinc-600 cursor-not-allowed border border-zinc-800"
                        : "bg-zinc-800 text-white hover:bg-zinc-700 border border-zinc-700"
                    }`}
                  >
                    Next →
                  </button>
                  <button
                    onClick={handleContinueSession}
                    disabled={inSession || credits < 5 || isConnecting}
                    className={`flex-1 px-6 py-4 font-bold transition-all ${
                      inSession || credits < 5 || isConnecting
                        ? "bg-zinc-800 text-zinc-600 cursor-not-allowed border border-zinc-800"
                        : "bg-white text-black hover:bg-zinc-200"
                    }`}
                  >
                    {inSession ? "Active" : "Start (−5)"}
                  </button>
                </div>

                {credits < 5 && !inSession && (
                  <div className="mt-4 border-l-4 border-red-500 bg-zinc-800 p-4">
                    <p className="text-red-500 font-semibold text-sm">
                      Not enough credits
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {showLogin && (
        <Login onLogin={handleLogin} onClose={() => setShowLogin(false)} />
      )}
    </div>
  );
}
