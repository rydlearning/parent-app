import { useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from 'react-redux';
import UserService from "../../services/user.service";
import { RootState } from '../../redux/rootReducer';

export const Testimonial = () => {
  const userInfo: any = useSelector((state: RootState) => state?.auth?.userInfo);
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const userService = new UserService();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    
    const payload = {
        testimonial: message,
    }

    const response = await userService.addTestimonial(payload);
    
    setMessage("");
    setIsOpen(false);
    toast.success(response.message);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full border-0 col-span-1 lg:text-[16px] text-[12px] hover:bg-ryd-primary/[0.9] bg-ryd-primary font-[400] text-white lg:px-[26px] px-[20px]  py-[14px]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          fill="currentColor"
          className="bi bi-chat-heart-fill"
          viewBox="0 0 16 16"
        >
          <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9 9 0 0 0 8 15m0-9.007c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute bottom-0 right-0 bg-white p-4 border rounded-lg shadow-lg w-80 ">
          <div className="bg-ryd-primary text-white p-3 rounded-t-lg mb-2">
            <p className="text-white">
              Hi 👋.... We’re thrilled to hear from you!
            </p>
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-5 right-5 text-white hover:text-gray-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col space-y-4  py-2"
          >
            <textarea
              placeholder="Testimonial"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="border p-2 rounded"
              rows={4}
              required
            />
            <button
              type="submit"
              className="bg-ryd-primary text-white p-2 rounded hover:bg-ryd-primary/[0.9] transition"
            >
              Submit Your Testimonial
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
