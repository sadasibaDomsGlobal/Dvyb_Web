import React, { useState, useEffect } from 'react';
import { ArrowLeft, User, Upload, X, CheckCircle, AlertCircle } from "lucide-react";
import step1img from '../../../assets/TryOn/step1img.svg'
import Tickic from '../../../assets/TryOn/tick_ic.svg'
import black_warnIc from '../../../assets/TryOn/black_warnIc.svg'
import red_warnIc from '../../../assets/TryOn/red_warnIc.svg'




const ProfilePhotoSelector = ({ onSelect }) => {
  const [firebaseImage, setFirebaseImage] = useState('https://res.cloudinary.com/doiezptnn/image/upload/v1760530680/model2_eh2sqf.jpg');
  const [loading, setLoading] = useState(false);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-4">
        <div className="animate-spin h-6 w-6 border-2 border-b-red-700 rounded-full"></div>
      </div>
    );
  }

  if (!firebaseImage) return null;

  return (
    <button
      onClick={() => onSelect(firebaseImage)}
      className="w-full border border-gray-200 rounded-xl p-4 hover:border-primary transition-all bg-white hover:bg-red-50"
    >
      <div className="flex items-center gap-4">
        <img
          src={firebaseImage}
          alt="Saved model"
          className="w-16 h-20 object-cover rounded-md border border-gray-200"
        />
        <div className="text-left flex-1">
          <div className="flex items-center gap-2">
            <User size={16} className="text-primary" />
            <span className="font-medium text-gray-800">Use My Saved Photo</span>
          </div>
          <p className="text-xs text-gray-600 mt-1">Use your uploaded model photo</p>
          <span className="text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded-full inline-block mt-2">
            ✓ Ready to use
          </span>
        </div>
      </div>
    </button>
  );
};

const UploadSelfieModal = ({ isOpen, onClose, onNext, garmentImage, garmentName, isSaree, is3D = false }) => {
  const [step, setStep] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [firebaseImage, setFirebaseImage] = useState(null);
  const [loadingFirebaseImage, setLoadingFirebaseImage] = useState(true);
  const [imageSource, setImageSource] = useState("");
  const [uploadError, setUploadError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setSelectedImage(null);
      setImageSource("");
      setUploadError("");
      setIsUploading(false);
    }
  }, [isOpen]);

  const uploadToCloudinary = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "tryon_unsigned");
    data.append("cloud_name", "doiezptnn");

    const res = await fetch("https://api.cloudinary.com/v1_1/doiezptnn/image/upload", {
      method: "POST",
      body: data,
    });

    const json = await res.json();
    if (!json.secure_url) throw new Error("Cloudinary upload failed");
    return json.secure_url;
  };

  const validateImage = async (imageUrl) => {
    try {
      const img = new Image();
      img.src = imageUrl;
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });
      return img.width >= 400 && img.height >= 600;
    } catch {
      return false;
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
      setUploadError("Please select a valid image (JPEG, PNG, JPG).");
      setStep(5);
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setUploadError("File size exceeds 2MB. Please choose a smaller image.");
      setStep(5);
      return;
    }

    setStep(3);
    setIsUploading(true);
    setUploadError("");

    try {
      const cloudinaryUrl = await uploadToCloudinary(file);
      setSelectedImage(cloudinaryUrl);
      setImageSource("upload");

      const isValid = await validateImage(cloudinaryUrl);
      setStep(isValid ? 4 : 5);
    } catch {
      setUploadError("Failed to upload image. Please try again.");
      setStep(5);
    } finally {
      setIsUploading(false);
    }
  };

  const handleContinue = () => {
    if (selectedImage && garmentImage) {
      onNext({ modelImage: selectedImage, garmentImage, is3D });
    }
  };

  const handleReupload = () => {
    setStep(2);
    setSelectedImage(null);
    setUploadError("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center  p-4">
      <div className="w-auto bg-white shadow-2xl overflow-hidden relative flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-13 right-12 text-gray-600 hover:text-gray-800  p-1 shadow-sm"
        >
          <X size={22} />
        </button>

        {/* Step 1: Initial Selection */}
{step === 1 && (
  <div className="flex flex-col md:flex-row bg-white md:rounded-xl md:gap-[26px] overflow-hidden md:shadow-lg  w-full md:w-[838px] h-auto md:h-[564px]">
    
    {/* LEFT IMAGE SECTION */}
    <div className="flex justify-center items-center md:p-3">
      <img
        src={step1img}
        alt="Garment"
        className="w-full h-[240px] md:w-[400px] md:h-[532px] object-cover"
      />
    </div>

    {/* RIGHT SIDE CONTENT */}
    <div className="flex flex-col pt-4 px-4 md:pt-16 md:px-0 md:w-[400px] w-full pb-16 md:pb-0 relative">
      
      {/* HEADING - Shows first on mobile, after card on desktop */}
      <div className="block md:hidden">
        <h2 className="text-2xl text-start font-semibold text-black">Try-On</h2>
        <p className="text-gray-600 text-sm mb-4 mt-1 font-medium">Let's go shopping</p>
      </div>

      {/* SELECTED DRESS CARD */}
      <div className="w-full md:w-[180px] rounded-xl shadow-md border p-2 border-gray-200 mb-5 md:mb-0">
        <div className="flex justify-between items-center p-3 bg-[#EEF7F0] border border-[#B8E3C6] py-1 rounded-md">
          <p className="text-[10px] font-medium text-[#15912C]">SELECTED DRESS</p>
          <img src={Tickic} className="h-4" alt="" />
        </div>
        <div className="flex gap-3 mt-3 items-center">
          <img src={garmentImage} className="h-12 w-12 rounded-md object-cover" alt="" />
          <p className="text-xs text-gray-700 line-clamp-2">{garmentName}</p>
        </div>
      </div>

      {/* HEADING - Shows after card on desktop */}
      <div className="hidden md:block">
        <h2 className="text-3xl text-start font-semibold mt-6 text-black">Try-On</h2>
        <p className="text-gray-600 text-sm mb-5 mt-2 font-medium">Let's go shopping</p>
      </div>

      {/* BUTTONS */}
      <button
        onClick={() => setStep(2)}
        className="w-full md:w-[345px] bg-[#8B0000] text-white h-[44px] text-sm hover:bg-[#A30000] transition rounded-md md:rounded-none"
      >
        Upload a picture
      </button>

      <button
        onClick={onClose}
        className="w-full md:w-[345px] border border-[#8B0000] text-[#8B0000] h-[44px] text-sm font-medium mt-3 hover:bg-[#8B0000] hover:text-white transition rounded-md md:rounded-none"
      >
        Select a model
      </button>

      {/* FOOTNOTE */}
      <p className="text-[10px] mt-4 text-gray-600 leading-tight md:max-w-[320px] text-start">
        Hey! To use the 2D TRY ON feature, just upload or take a selfie or <br className="hidden md:inline" />Press <span className='text-primary text-xs font-medium'>SKIP</span> to check out the models you can try on!
      </p>

      {/* SKIP BUTTON (BOTTOM-RIGHT) */}
      <button
        onClick={onClose}
        className="absolute bottom-4 right-4 cursor-pointer text-gray-600 border border-gray-300 px-4 py-1 rounded-md text-sm font-medium flex items-center gap-1 hover:text-gray-800"
      >
        SKIP
        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  </div>
)}


        {/* Step 2: Upload Instructions */}
 {step === 2 && (
  <div className="p-4  items-center text-center justify-center w-full md:w-[818px] overflow-y-auto relative max-w-full">
    {/* Close Button */}
    <button className="absolute top-4 right-4 md:top-6 md:right-6 text-gray-500 hover:text-gray-700">
      {/* <X size={24} /> */}
    </button>

    <button
      onClick={() => setStep(1)}
      className="mb-4 md:mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-800"
    >
      {/* <ArrowLeft size={20} /> Back */}
    </button>

    <h2 className="text-base md:text-xl font-bold text-gray-900 max-w-full md:max-w-2xl pr-8 md:pr-0">
      Upload your full photo for the best try-on experience 
    </h2>
<p className='text-xl'>— we'll do the rest!</p>
    <div className="mt-4  md:mt-6  text-center justify-center -ml-24 flex flex-col md:flex-row  md:gap-8 gap-0  md:items-start">
      {/* Example Image */}
      <div className="flex justify-center w-full md:w-[230px] h-auto md:h-[369px] mb-4 md:mb-0">
        <img
          src="https://res.cloudinary.com/doiezptnn/image/upload/v1760530680/model2_eh2sqf.jpg"
          alt="Example"
          className="w-full max-w-[280px] md:max-w-none md:w-full h-auto object-cover"
        />
      </div>

      {/* Instructions + Upload */}
      <div className="w-full md:w-[309px] px-0">
        {/* Instruction Box */}
        <div 
          className="rounded-lg p-4 md:p-5 w-full md:w-[388px] bg-[#FFF8F4]"
          style={{
            backgroundImage: `
              repeating-linear-gradient(0deg, #CFCFCF 0, #CFCFCF 12px, transparent 12px, transparent 24px),
              repeating-linear-gradient(90deg, #CFCFCF 0, #CFCFCF 12px, transparent 12px, transparent 24px),
              repeating-linear-gradient(180deg, #CFCFCF 0, #CFCFCF 12px, transparent 12px, transparent 24px),
              repeating-linear-gradient(270deg, #CFCFCF 0, #CFCFCF 12px, transparent 12px, transparent 24px)
            `,
            backgroundSize: '2px 100%, 100% 2px, 2px 100%, 100% 2px',
            backgroundPosition: '0 0, 0 0, 100% 0, 0 100%',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <h3 className="font-bold text-gray-900 mb-2 md:mb-3 text-sm md:text-base">INSTRUCTIONS:</h3>

          <ul className="space-y-1.5 md:space-y-2 mt-3 md:mt-5 text-xs md:text-sm">
            <li className="flex gap-2 text-[#7F6301]">
              <span className="text-[#7F6301] ml-3 font-medium">• Stand straight and face forward</span>
            </li>
            <li className="flex gap-2 text-[#7F6301]">
              <span className="text-[#7F6301] ml-3 font-medium">• Maintain good lighting and contrast</span>
            </li>
            <li className="flex gap-2 text-[#7F6301]">
              <span className="text-[#7F6301] ml-3 font-medium">• Avoid filters or busy backgrounds</span>
            </li>
            <li className="flex gap-2 text-[#7F6301]">
              <span className="text-[#7F6301] ml-3 font-medium">• Keep file size under 2MB</span>
            </li>
          </ul>
        </div>

        <p className="text-xs md:text-sm text-gray-700 font-medium mt-3 md:mt-4 w-full md:w-[388px] leading-relaxed">
          Your photos are never stored in our system. We respect your privacy and are committed to protecting your personal data.
        </p>

        {/* Upload Button */}
        <input
          type="file"
          accept="image/jpeg,image/png,image/jpg"
          onChange={handleFileChange}
          className="hidden"
          id="uploadInput"
        />
        <label
          htmlFor="uploadInput"
          className="mt-3 md:mt-4 block w-full md:w-[388px] bg-primary hover:bg-hoverBg text-white py-3 text-center font-medium cursor-pointer transition-colors text-sm"
        >
          Click to upload
        </label>

        {/* Camera Button */}
        <button
          className="mt-3 w-full md:w-[388px] border border-[#8A0000] text-primary py-3 font-medium hover:bg-hoverBg hover:text-white cursor-pointer transition text-sm"
        >
          Use camera
        </button>
      </div>
    </div>
  </div>
)}
        {/* Step 3: Uploading */}
        {step === 3 && (
          <div className="p-8 flex flex-col items-center justify-center overflo text-center min-h-[400px]">
            <div className="relative bg-gray-100 rounded-xl w-full max-w-sm overflow-hidden mb-6">
              <img src={selectedImage} alt="Uploading" className="w-full h-64 object-contain opacity-50" />
              <div className="absolute inset-0 flex flex-col justify-center items-center bg-black/40">
                <div className="animate-spin h-10 w-10 border-4 border-white border-t-transparent rounded-full mb-3"></div>
                <p className="text-white font-semibold text-lg">Uploading</p>
              </div>
            </div>
            <div className="bg-red-50 p-4 rounded-xl border border-red-200 text-left w-full max-w-sm">
              <p className="font-semibold text-red-800 mb-2">Please follow the below instructions</p>
              <ul className="text-sm text-red-700 space-y-1">
                <li>• Keep file size under 2MB</li>
                <li>• Ensure image is clear and not pixelated</li>
                <li>• Maintain good lighting and contrast</li>
                <li>• Keep background clean or neutral</li>
              </ul>
            </div>
            <button className="w-full max-w-sm bg-primary text-white py-3 rounded-lg font-medium mt-5 opacity-60 cursor-not-allowed">
              CONTINUE
            </button>
            <button className="w-full max-w-sm border border-gray-300 py-3 rounded-lg mt-3 text-gray-700 opacity-60 cursor-not-allowed">
              RE-UPLOAD
            </button>
          </div>
        )}

        {/* Step 4: Success */}
        {step === 4 && (
          <div className="p-8 flex flex-col items-center justify-center text-center">
            <img src={selectedImage} alt="Success" className="w-full max-w-sm h-64 object-cover  shadow-md mb-4" />
            <div className="flex items-center gap-2  px-4 py-3 rounded-lg mb-5">
              {/* <CheckCircle className="text-green-600" size={22} /> */}
              <p className="text-green-700 font-normal -ml-48  text-start text-sm">Image uploaded successfully</p>
            </div>
            <button onClick={handleContinue} className="w-full max-w-sm bg-primary text-white py-3  font-medium hover:bg-red-800">
              CONTINUE
            </button>
            <button onClick={handleReupload} className="w-full max-w-sm border border-gray-300 text-gray-700 py-3  mt-3 hover:border-red-700">
              RE-UPLOAD
            </button>
            <p className="text-xs text-gray-600 mt-4">Your photos are never stored in our system. We respect your privacy and are committed to protecting your personal data.</p>
          </div>
        )}

        {/* Step 5: Error */}
        {step === 5 && (
          <div className="p-8 flex flex-col items-center justify-center text-center">
        <div className=' w-full max-w-sm '>

            <img src={selectedImage} alt="Error" className="w-full max-w-sm h-64 object-cover   backdrop-blur-3xl blur-xs  " />
        </div>
            <div className="  mt-3    text-left w-full max-w-lg ml-28  ">
              <div className='flex items-center gap-4  '>

              <img src={red_warnIc} className='h-5' alt="" />
              <p className="text-red-600    text-lg ">
                {uploadError || "Image you uploaded was blurred or pixelated"}
              </p>
              </div>
              <div className='flex  -ml-0.5 items-center mt-4 gap-3'>
<img src={black_warnIc} className='h-6' alt="" />
              <p className='font-semibold text-lg text-outfit '>  Please follow the below instructions </p>
              </div>
              <ul className="text-md ml-2 text-black  text-outfit  mt-3 space-y-1">
                <li >•  Keep file size under 2MB</li>
                <li>•  Ensure image is clear and not pixelated</li>
                <li>• Maintain <span className='text-primary'> good lighting and contrast </span> </li>
                <li>• Keep background clean or neutral</li>
              </ul>
            </div>
            <button onClick={handleReupload} className="w-full max-w-sm bg-primary text-white py-3 rounded-lg font-medium mt-5 hover:bg-red-800">
              RE-UPLOAD
            </button>
            <p className="text-xs text-gray-600 mt-4">Your photos are never stored in our system. We respect your privacy and are committed to protecting your personal data.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadSelfieModal;
