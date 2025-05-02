
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { Link } from "react-router-dom";

const AdminButton = () => {
  return (
    <Link to="/admin/login">
      <Button
        variant="outline"
        size="icon"
        className="fixed bottom-4 right-4 rounded-full z-50 bg-slate-800 text-white hover:bg-slate-700 border-none shadow-lg animate-pulse"
      >
        <Settings className="h-5 w-5" />
      </Button>
    </Link>
  );
};

export default AdminButton;
