import React, { useState, useEffect } from "react";
import Link from "react-router-dom";
import ParentService from "../../services/user.service";
import { toast } from "react-toastify";

export const MigrationPopup = (id: any) => {
  const [show, setShow] = useState<boolean>(false);
  const [modalLoaded, setModalLoaded] = useState<boolean>(false);
  const parentService = new ParentService();

  useEffect(() => {
    // Simulate delay for modal appearance
    const timer = setTimeout(() => {
      setModalLoaded(true);
      setShow(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = (): void => {
    setShow(false);
  };

  const handleMigration = async () => {
    console.log(id)
    const response = await parentService.Migration(id?.id);
    console.log(response);
    if (!response.status) {
      toast.error(response.message);
      return;
    }
    toast.success("Joined successfully, Relogin to continue... ");
    window.location.reload();
  };

  return (
    <>
      {modalLoaded && (
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center transition-opacity duration-300 ${
            show ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          id="promoModal"
        >
          <div className="bg-white rounded-lg p-6 sm:w-96">
            <div className="flex justify-between items-center mb-4">
              <h5 className="text-xl font-semibold text-[#AA468E]">
                🌟 Thank You for Joining Our Free 2-Day Cohort!
              </h5>
              <button
                type="button"
                className="text-[#AA468E] text-2xl"
                onClick={handleClose}
              >
                &times;
              </button>
            </div>
            <p className="text-lg font-semibold">
              🎓 You're closer to unlocking your child's potential!
            </p>
            <p className="text-gray-600 mb-2">
              We hope you enjoyed our free 2-day coding experience.
            </p>
            <hr />
            <ul className="list-disc pl-5 text-gray-600 mt-2">
              <li>✅ Comprehensive Learning</li>
              <li>✅ Full Access to Courses</li>
              <li>✅ Personalized Support</li>
              <li>✅ Join our Full Program!</li>
            </ul>
            <div className="text-center mt-4">
              <h4 className="text-lg text-green-500 font-semibold">
                Take Your Child’s Learning Further! 🚀
              </h4>
              <p className="text-gray-600">
                Continue their growth in the world of coding!
              </p>
            </div>
            <div className="mt-6 flex justify-between">
              <button
                type="button"
                className="w-full sm:w-auto py-2 px-4 bg-gray-300 rounded-lg text-gray-700 hover:bg-gray-400"
                onClick={handleClose}
              >
                Close
              </button>
              <button
                className="w-full sm:w-auto py-2 px-4 bg-[#AA468E] text-white rounded-lg hover:bg-[#933B74]"
                onClick={handleMigration}
              >
                Join Now
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
