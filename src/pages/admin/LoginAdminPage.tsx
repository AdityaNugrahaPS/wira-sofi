import React, { useState, useEffect } from "react";
import { Button } from "../../components/ui/Button";
import { Card, CardContent } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { useNavigate } from "react-router-dom";

export function LoginAdminPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Prevent scrolling completely
  useEffect(() => {
    // Save original styles
    const originalStyle = window.getComputedStyle(document.body).overflow;
    
    // Disable scrolling
    document.body.style.overflow = 'hidden';
    
    // Re-enable on unmount
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Validasi admin login
    if (username === "admin" && password === "admin123") {
      // Arahkan ke halaman dashboard admin
      navigate("/admin/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-transparent px-4 sm:px-6">
      <Card className="w-9/12 max-w-xs sm:max-w-sm md:max-w-md border-2 sm:border-4 border-[#C2AF93] bg-[#F7F3ED] shadow-xl relative">
        {/* Corner decorative elements - Responsive sizes */}
        <div className="absolute top-0 left-0 w-4 h-4 sm:w-6 md:w-8 sm:h-6 md:h-8 border-t-2 border-l-2 sm:border-t-3 sm:border-l-3 md:border-t-4 md:border-l-4 border-[#BAA485]"></div>
        <div className="absolute top-0 right-0 w-4 h-4 sm:w-6 md:w-8 sm:h-6 md:h-8 border-t-2 border-r-2 sm:border-t-3 sm:border-r-3 md:border-t-4 md:border-r-4 border-[#BAA485]"></div>
        <div className="absolute bottom-0 left-0 w-4 h-4 sm:w-6 md:w-8 sm:h-6 md:h-8 border-b-2 border-l-2 sm:border-b-3 sm:border-l-3 md:border-b-4 md:border-l-4 border-[#BAA485]"></div>
        <div className="absolute bottom-0 right-0 w-4 h-4 sm:w-6 md:w-8 sm:h-6 md:h-8 border-b-2 border-r-2 sm:border-b-3 sm:border-r-3 md:border-b-4 md:border-r-4 border-[#BAA485]"></div>

        <CardContent className="p-4 sm:p-6 md:p-8">
          <h2 className="text-2xl sm:text-3xl font-normal text-center text-[#8A7A61] mb-4 sm:mb-6 md:mb-8" style={{ fontFamily: "'OVO', serif" }}>
            Admin Login
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div className="relative">
              <i className="fas fa-user absolute left-3 top-1/2 transform -translate-y-1/2 text-[#BAA485] text-sm sm:text-base"></i>
              <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setUsername(e.target.value)
                }
                className="w-full bg-[#F7F3ED] border-2 border-[#C2AF93] focus:border-[#BAA485] focus:ring-[#BAA485] py-2 sm:py-3 pl-8 sm:pl-10 pr-3 sm:pr-4 rounded text-sm sm:text-base text-[#5D4B35] placeholder-[#BAA485]/70"
                style={{ fontFamily: "'OVO', serif" }}
              />
            </div>
            <div className="relative">
              <i className="fas fa-key absolute left-3 top-1/2 transform -translate-y-1/2 text-[#BAA485] text-sm sm:text-base"></i>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
                className="w-full bg-[#F7F3ED] border-2 border-[#C2AF93] focus:border-[#BAA485] focus:ring-[#BAA485] py-2 sm:py-3 pl-8 sm:pl-10 pr-3 sm:pr-4 rounded text-sm sm:text-base text-[#5D4B35] placeholder-[#BAA485]/70"
                style={{ fontFamily: "'OVO', serif" }}
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-[#BAA485] hover:bg-[#A89475] text-white py-2 sm:py-3 rounded text-sm sm:text-base transition-colors duration-300"
              style={{ fontFamily: "'OVO', serif" }}
            >
              Log in
            </Button>
          </form>

          {/* Subtle decorative line */}
          <div className="mt-6 sm:mt-8 border-t border-[#C2AF93]/30 pt-3 sm:pt-4 text-center">
            <p className="text-xs sm:text-sm text-[#8A7A61]" style={{ fontFamily: "'OVO', serif" }}>
              Wira-Sofi Admin Panel
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default LoginAdminPage;