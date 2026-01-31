import React, { useState } from "react";

export default function Login({ onLogin, onClose }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [userType, setUserType] = useState("learner");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nameError, setNameError] = useState("");
  const [generalError, setGeneralError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Reset errors
    setEmailError("");
    setPasswordError("");
    setNameError("");
    setGeneralError("");

    let hasError = false;

    // Validate name for signup
    if (isSignUp && name.trim().length < 2) {
      setNameError("Name must be at least 2 characters");
      hasError = true;
    }

    // Validate email
    if (!isValidEmail(email)) {
      setEmailError("Please enter a valid email address");
      hasError = true;
    }

    // Validate password
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      hasError = true;
    }

    if (hasError) return;

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      if (isSignUp) {
        // Sign up logic
        const users = JSON.parse(localStorage.getItem('skillsnap_users') || '[]');
        
        // Check if user already exists
        const existingUser = users.find(u => u.email === email);
        if (existingUser) {
          setGeneralError("An account with this email already exists");
          setIsSubmitting(false);
          return;
        }

        // Create new user
        const newUser = {
          id: Date.now(),
          name: name.trim(),
          email,
          password,
          userType,
          createdAt: new Date().toISOString()
        };

        users.push(newUser);
        localStorage.setItem('skillsnap_users', JSON.stringify(users));
        
        // Set current user
        const userSession = {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          userType: newUser.userType
        };
        localStorage.setItem('skillsnap_current_user', JSON.stringify(userSession));
        
        setIsSubmitting(false);
        onLogin(userType, userSession);
      } else {
        // Login logic
        const users = JSON.parse(localStorage.getItem('skillsnap_users') || '[]');
        const user = users.find(u => u.email === email && u.password === password);
        
        if (!user) {
          setGeneralError("Invalid email or password");
          setIsSubmitting(false);
          return;
        }

        // Set current user
        const userSession = {
          id: user.id,
          name: user.name,
          email: user.email,
          userType: user.userType
        };
        localStorage.setItem('skillsnap_current_user', JSON.stringify(userSession));
        
        setIsSubmitting(false);
        onLogin(user.userType, userSession);
      }
    }, 800);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setGeneralError("");
    
    if (value && !isValidEmail(value)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setGeneralError("");
    
    if (value && value.length < 6) {
      setPasswordError("Password must be at least 6 characters");
    } else {
      setPasswordError("");
    }
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    
    if (isSignUp && value && value.trim().length < 2) {
      setNameError("Name must be at least 2 characters");
    } else {
      setNameError("");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-6">
      <div className="bg-zinc-900 border border-zinc-800 max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-500 hover:text-white text-2xl font-bold leading-none"
          aria-label="Close"
        >
          ×
        </button>

        <div className="p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-white flex items-center justify-center font-black text-black text-2xl">
              S
            </div>
            <div>
              <h1 className="text-2xl font-black text-white">SkillSnap</h1>
              <p className="text-xs text-zinc-600">Instant tutoring</p>
            </div>
          </div>

          <h2 className="text-3xl font-black text-white mb-2">
            {isSignUp ? "Create Account" : "Welcome Back"}
          </h2>
          <p className="text-zinc-500 mb-6">
            {isSignUp ? "Join SkillSnap today" : "Log in to continue"}
          </p>

          {generalError && (
            <div className="bg-red-950 border border-red-500 p-3 mb-4">
              <p className="text-red-300 text-sm font-medium">{generalError}</p>
            </div>
          )}

          <div className="flex gap-2 mb-6">
            <button
              type="button"
              onClick={() => setUserType("learner")}
              className={`flex-1 py-3 font-bold transition-all ${
                userType === "learner"
                  ? "bg-white text-black"
                  : "bg-zinc-800 text-zinc-500 hover:bg-zinc-700"
              }`}
            >
              I'm a Learner
            </button>
            <button
              type="button"
              onClick={() => setUserType("tutor")}
              className={`flex-1 py-3 font-bold transition-all ${
                userType === "tutor"
                  ? "bg-white text-black"
                  : "bg-zinc-800 text-zinc-500 hover:bg-zinc-700"
              }`}
            >
              I'm a Tutor
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div>
                <label className="block text-sm font-semibold text-zinc-400 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={handleNameChange}
                  className={`w-full bg-black border px-4 py-3 text-white focus:outline-none ${
                    nameError ? "border-red-500" : "border-zinc-800 focus:border-white"
                  }`}
                  placeholder="John Doe"
                  required
                />
                {nameError && (
                  <p className="text-red-500 text-sm mt-1">{nameError}</p>
                )}
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-zinc-400 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                className={`w-full bg-black border px-4 py-3 text-white focus:outline-none ${
                  emailError ? "border-red-500" : "border-zinc-800 focus:border-white"
                }`}
                placeholder="you@example.com"
                required
              />
              {emailError && (
                <p className="text-red-500 text-sm mt-1">{emailError}</p>
              )}
            </div>

            <div className="relative">
              <label className="block text-sm font-semibold text-zinc-400 mb-2">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handlePasswordChange}
                className={`w-full bg-black border px-4 py-3 pr-20 text-white focus:outline-none ${
                  passwordError ? "border-red-500" : "border-zinc-800 focus:border-white"
                }`}
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-10 text-zinc-500 hover:text-white text-sm font-semibold"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
              {passwordError && (
                <p className="text-red-500 text-sm mt-1">{passwordError}</p>
              )}
            </div>

            {isSignUp && userType === "tutor" && (
              <div className="bg-black border border-zinc-800 p-4">
                <p className="text-sm text-zinc-500">
                  <span className="text-white font-semibold">Tutors:</span>{" "}
                  After signup, you'll complete your profile with skills, bio,
                  and verification.
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-white text-black py-4 font-bold hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Loading..." : isSignUp ? "Sign Up" : "Log In"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setEmailError("");
                setPasswordError("");
                setNameError("");
                setGeneralError("");
              }}
              className="text-zinc-500 hover:text-white text-sm"
            >
              {isSignUp ? (
                <>
                  Already have an account?{" "}
                  <span className="font-bold text-white">Log in</span>
                </>
              ) : (
                <>
                  Don't have an account?{" "}
                  <span className="font-bold text-white">Sign up</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}