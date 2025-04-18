import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import domtoimage from 'dom-to-image';
import { toast } from 'react-toastify';
import UserService from '../../../services/user.service';
import { formatDate } from '../../../components/custom-hooks';
import logo from '../../../assets/images/ryd-logo.png'
import { CustomModal } from '../../../components/ui';

const SingleReportView = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [report, setReport] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [comment, setComment] = useState('');
    const [submittingComment, setSubmittingComment] = useState(false);
    const [generatingPDF, setGeneratingPDF] = useState(false);
    const reportRef = useRef<HTMLDivElement>(null);
    const [toggleComment, setToggleComment] = useState(false);

    useEffect(() => {
        const fetchReport = async () => {
            try {
                const userService = new UserService();
                const response = await userService.getReportById(id!);

                if (!response.status) {
                    toast.error(response.message);
                    navigate('/parent/home');
                    return;
                }

                setReport(response.data);
            } catch (error) {
                toast.error('Failed to load report');
                navigate('/parent/home');
            } finally {
                setLoading(false);
            }
        };

        fetchReport();
    }, [id, navigate]);

    useEffect(() => {
        if (report?.parentComments === null) {
            setToggleComment(true)
        }
    }, [report])

    const handleDownloadPDF = async () => {
        if (!reportRef.current) return;

        setGeneratingPDF(true);
        try {
            // Use domtoimage to convert the report to a PNG
            const imgData = await domtoimage.toPng(reportRef.current, {
                quality: 1,
                bgcolor: '#ffffff'
            });

            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgWidth = 210;
            const pageHeight = 295;
            const imgHeight = (pdf.internal.pageSize.getHeight() * imgWidth) / pdf.internal.pageSize.getWidth();

            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

            pdf.save(`${report?.child.firstName + "_" + report?.child.lastName}_Report_${formatDate(report?.createdAt)}.pdf`);
        } catch (error) {
            console.error("Error generating PDF:", error);
            toast.error("Failed to generate PDF");
        } finally {
            setGeneratingPDF(false);
        }
    };

    const handleSubmitComment = async () => {
        if (!comment.trim()) return;

        setSubmittingComment(true);
        try {
            const userService = new UserService();
            const response = await userService.commentSubmit(comment, id);

            if (!response.status) {
                toast.error(response.message);
                return;
            }

            toast.success(response.message);
            setComment('');
            // Refresh report data to show new comment
            window.location.reload();
        } catch (err) {
            toast.error("Failed to submit comment");
        } finally {
            setSubmittingComment(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="h-12 w-12 rounded-full border-4 border-[#AA468F] border-t-transparent animate-spin"></div>
            </div>
        );
    }

    if (!report) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-center">
                    <h2 className="text-xl font-semibold">Report not found</h2>
                    <Link to="/parent/home" className="text-blue-600 mt-2 inline-block">
                        Back to Dashboard
                    </Link>
                </div>
            </div>
        );
    }

    const commentCreation = (
        <div className="bg-gray-50 p-4 rounded-lg relative">
            {/* Add the close button - only shown when toggle is true */}
            {toggleComment && (
                <button 
                    onClick={() => setToggleComment(false)} // or whatever your toggle handler is
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>
            )}
            
            <h4 className="text-lg font-medium mb-3">We appreciate your Feedback</h4>
            <textarea
                className="w-full border border-gray-300 rounded-lg p-3 mb-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={4}
                placeholder="Please provide feedback about the class sessions, the teacher and the learning processes (max 500 characters)..."
                value={comment}
                onChange={(e) => {
                    if (e.target.value.length <= 500) {
                        setComment(e.target.value);
                    }
                }}
                maxLength={500}
            />
            <div className="flex justify-between items-center mb-3">
                <span className={`text-xs ${comment.length >= 450 ? 'text-amber-600' : 'text-gray-500'}`}>
                    {comment.length}/500 characters
                </span>
                {comment.length >= 450 && (
                    <span className="text-xs text-amber-600">
                        Approaching character limit
                    </span>
                )}
            </div>
            <button
                onClick={handleSubmitComment}
                disabled={submittingComment || !comment.trim()}
                className="rounded-[12px] border-0 col-span-1 lg:text-[16px] text-[12px] bg-ryd-primary/[0.9] font-[400] text-white lg:px-[26px] px-[20px] py-[14px]"
            >
                {submittingComment ? (
                    <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                    </>
                ) : 'Submit Comment'}
            </button>
        </div>
    )

    console.log(report)
    const handleCloseComment = () => {
        setToggleComment(false);
    };


    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="mb-6">
                <Link
                    to="/parent/home"
                    className="flex items-center text-ryd-primary hover:text-black-800"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    Back to Dashboard
                </Link>
            </div>

            <div ref={reportRef} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                {/* Report Header with Logo */}
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <img
                            src={logo}
                            alt="Company Logo"
                            className="h-16 object-contain"
                            onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                            }}
                        />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800">Student Progress Report</h1>
                    <p className="text-gray-500 mt-1">{formatDate(report.createdAt)}</p>
                </div>

                {/* Student Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 p-4 bg-gray-50 rounded-lg">
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Student Name</p>
                        <p className="text-gray-800">{report.child.firstName + " " + report.child.lastName}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Course</p>
                        <p className="text-gray-800">{report.name}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Level</p>
                        <p className="text-gray-800">{report.program.package.title}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Teacher</p>
                        <p className="text-gray-800">{report.teacher.firstName + " " + report.teacher.lastName || 'Not specified'}</p>
                    </div>
                </div>

                {/* Report Sections */}
                <div className="space-y-8">
                    <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                            <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                            Progress Summary
                        </h3>
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <p className="text-gray-700 whitespace-pre-line">
                                {report.progressNotes}
                            </p>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                            <span className="w-3 h-3 bg-amber-500 rounded-full mr-2"></span>
                            Areas for Improvement
                        </h3>
                        <div className="bg-amber-50 p-4 rounded-lg">
                            <p className="text-gray-700 whitespace-pre-line">
                                {report.areasForImprovement}
                            </p>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                            <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                            Parent Support Suggestions
                        </h3>
                        <div className="bg-green-50 p-4 rounded-lg">
                            <p className="text-gray-700 whitespace-pre-line">
                                {report.supportSuggestions}
                            </p>
                        </div>
                    </div>

                    {report.additionalComments && (
                        <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                                <span className="w-3 h-3 bg-purple-500 rounded-full mr-2"></span>
                                Additional Comments
                            </h3>
                            <div className="bg-purple-50 p-4 rounded-lg">
                                <p className="text-gray-700 whitespace-pre-line">
                                    {report.additionalComments}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Completion Status */}
                    {/* <div className="flex justify-between items-center pt-4 border-t border-gray-200">
            <span className="text-sm text-gray-500">Cohort Completion:</span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              report.cohortCompleted 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {report.cohortCompleted ? 'Completed' : 'Not Completed'}
            </span>
          </div> */}

                </div>
            </div>
            {/* Comments Section */}
            <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Comments</h3>

                {/* Existing Comments */}
                {report.parentComments ? (
                    <div className="space-y-4 mb-6">
                        <div className="border-b border-gray-100 pb-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="font-medium">{report.child.parent.firstName + " " + report.child.parent.lastName}</p>
                                    <p className="text-sm text-gray-500">
                                        {formatDate(report.createdAt)}
                                    </p>
                                </div>
                                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                    Your comment
                                </span>
                            </div>
                            <p className="mt-2 text-gray-700 whitespace-pre-line">
                                {report.parentComments}
                            </p>
                        </div>
                    </div>
                ) : (
                    <p className="text-gray-500 mb-6">No comments yet</p>
                )}

                {/* Add Comment */}
                {!report.parentComments ? (
                <> {commentCreation}</>
                ) : null}
            </div>
            {/* Download Button */}
            <div className="mt-8 flex justify-center">
                <button
                    onClick={handleDownloadPDF}
                    disabled={generatingPDF}
                    className="flex items-center bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:bg-green-300 transition-colors"
                >
                    {generatingPDF ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Generating PDF...
                        </>
                    ) : (
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                            Download Report as PDF
                        </>
                    )}
                </button>
            </div>

            {toggleComment &&
                <CustomModal
                    modalStyle={`relative bg-white lg:w-[30%] lg:mt-[5rem] mt-[3rem] md:w-[70%] w-[95%] mx-auto rounded-[16px] `}
                    closeModal={handleCloseComment}
                >
                    {commentCreation}
                </CustomModal>
            }
        </div>
    );
};

export default SingleReportView;