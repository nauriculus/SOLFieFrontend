"use client";
import React from "react";
import { Img, Button } from "../../components";
import { useState, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";

export default function MainPage() {
  const [ratio, setRatio] = useState(9 / 16);
  const [image, setImage] = useState(null);
  const camera = useRef(null);

  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen(!isOpen);

  const handleClick = () => {
    window.location.href = "/picture";
  };

  return (
    <div
      className="flex overflow-hidden  
    bg-[url(/images/background.png)] bg-cover bg-no-repeat bg-center relative flex-col items-center pb-12 w-full min-h-[1000px] max-md:px-5"
    >
      <div className="mx-auto flex w-full max-w-[1113px]">
        <div className="flex w-full flex-col items-center">
          {/* rules button section */}
          <div className="flex items-start justify-between gap-5 self-stretch sm:flex-col">
            <Button
              onClick={toggleModal}
              color="black_900"
              shape="round"
              className="font-press-start text-white bg-black ml-[20px] mt-[65px] min-w-[150px] border-teal-A200 sm:px-5"
            >
              RULES
            </Button>
            <Img
              src="img_group_1_deep_purple_a700.svg"
              width={358}
              height={268}
              alt="decorative image"
              className="h-[268px] w-[32%] sm:w-full"
            />
          </div>

          <div onClick={handleClick}>
            <svg
              width="300"
              height="154"
              viewBox="0 0 278 94"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g filter="url(#filter0_d_130_1282)">
                <rect
                  x="23"
                  y="23"
                  width="232"
                  height="48"
                  rx="24"
                  fill="url(#paint0_linear_130_1282)"
                  shape-rendering="crispEdges"
                />
                <rect
                  x="24"
                  y="24"
                  width="230"
                  height="46"
                  rx="23"
                  stroke="url(#paint1_linear_130_1282)"
                  stroke-width="2"
                  shape-rendering="crispEdges"
                />
                <path
                  d="M49 53.5V41.5H45V39.5H57V41.5H53V53.5H49ZM59 53.5V43.5H61V41.5H63V39.5H69V41.5H71V43.5H73V53.5H69V49.5H63V53.5H59ZM63 47.5H69V43.5H67V41.5H65V43.5H63V47.5ZM75 53.5V39.5H79V45.5H81V43.5H83V41.5H85V39.5H89V41.5H87V43.5H85V45.5H83V47.5H85V49.5H87V51.5H89V53.5H83V51.5H81V49.5H79V53.5H75ZM91 53.5V39.5H105V41.5H95V45.5H103V47.5H95V51.5H105V53.5H91ZM123 53.5V39.5H135V41.5H137V47.5H135V49.5H127V53.5H123ZM127 47.5H133V41.5H127V47.5ZM141 53.5V51.5H145V41.5H141V39.5H153V41.5H149V51.5H153V53.5H141ZM159 53.5V51.5H157V49.5H155V43.5H157V41.5H159V39.5H167V41.5H169V43.5H165V41.5H161V43.5H159V49.5H161V51.5H165V49.5H169V51.5H167V53.5H159ZM177 53.5V41.5H173V39.5H185V41.5H181V53.5H177ZM189 53.5V51.5H187V39.5H191V51.5H197V39.5H201V51.5H199V53.5H189ZM203 53.5V39.5H215V41.5H217V47.5H213V49.5H215V51.5H217V53.5H211V51.5H209V49.5H207V53.5H203ZM207 47.5H211V45.5H213V41.5H207V47.5ZM219 53.5V39.5H233V41.5H223V45.5H231V47.5H223V51.5H233V53.5H219Z"
                  fill="white"
                />
              </g>
              <defs>
                <filter
                  id="filter0_d_130_1282"
                  x="0.700001"
                  y="0.700001"
                  width="276.6"
                  height="92.6"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset />
                  <feGaussianBlur stdDeviation="11.15" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0.643137 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_130_1282"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_130_1282"
                    result="shape"
                  />
                </filter>
                <linearGradient
                  id="paint0_linear_130_1282"
                  x1="139"
                  y1="23"
                  x2="139"
                  y2="71"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#5C2BE2" />
                  <stop offset="1" stop-color="#9747FF" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_130_1282"
                  x1="139"
                  y1="23"
                  x2="139"
                  y2="71"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#4DF3FB" />
                  <stop offset="1" stop-color="#4DF3FB" stop-opacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="flex mt-10 overflow-hidden relative w-full">
            <div className="flex space-x-7.5 animate-slide-right w-auto">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/326173bda5f7c19e79021e29de7548ed5b4926dff11275ec5d02157f15155394?"
                className=" shrink-0 self-stretch my-auto max-w-full aspect-[6.67] w-[125px]"
              />
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/1e9ca99ebcf5e84c2f2e64580d9353583c509607eaa7395050e3d4bca8660ddf?"
                className=" shrink-0 self-stretch my-auto w-32 max-w-full aspect-[3.85]"
              />
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/ecce975a431e3c33676367e415fd671360f753c6cfbb3592090844c75fabe1ff?"
                className=" shrink-0 self-stretch my-auto max-w-full aspect-[2.94] w-[103px]"
              />
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-black p-8 rounded-lg shadow-lg max-w-md w-full mx-4 overflow-hidden">
              <h2 className="text-xl font-press-start text-white font-semibold leading-relaxed">
                OFFICIAL RULES
              </h2>
              <div className="overflow-y-scroll mt-4 max-h-[80vh] text-white space-y-6">
                <p className="text-sm font-press-start leading-loose">
                  STEP 1. TAKE PICTURE
                </p>
                <p className="text-sm font-press-start leading-loose">
                  STEP 2. TWEET PICTURE W/ OUR TAGs
                </p>
                <p className="text-sm font-press-start leading-loose">
                  STEP 3. MINT NFT
                </p>
                <p className="text-sm font-press-start leading-loose">
                  STEP 4. GET SWAGGED UP, RECEIVE EXCLUSIVE MERCH & JOIN OUR
                  RAFFLE
                </p>
                <div className="text-xl font-press-start text-white font-semibold leading-relaxed">
                  Event Participation Agreement and Terms of Use:
                </div>
                <div className="p-2 text-xs font-press-start leading-loose">
                  Welcome to Guardians of the Multichain! By participating in
                  this event, you agree to the following terms and conditions.
                  Please read them carefully.
                  <br />
                  <br />
                  1. Participation Eligibility: You must be at least 18 years
                  old or of legal age in your jurisdiction to participate in
                  this event...
                  <br />
                  <br />
                  2. Photography and Image Use: During the event, you may have
                  your photograph taken...
                  <br />
                  <br />
                  3. Social Media Sharing: You agree to share your image along
                  with a pre-written message...
                  <br />
                  <br />
                  4. NFT Creation and Ownership: By participating, you consent
                  to the minting of an NFT...
                  <br />
                  <br />
                  5. Lottery Participation: Participation in the lottery is
                  voluntary...
                  <br />
                  <br />
                  6. Data Protection and Privacy: We will collect and store
                  personal data...
                  <br />
                  <br />
                  7. Liability: Staking Facilities GmbH is not responsible for
                  any damages...
                  <br />
                  <br />
                  8. Governing Law: These terms are governed by the laws of
                  Germany...
                  <br />
                  <br />
                  9. Changes to Terms: Staking Facilities GmbH reserves the
                  right, at its sole discretion...
                  <br />
                  <br />
                  10. Contact Information: If you have any questions...
                </div>
              </div>

              <button
                onClick={toggleModal}
                className="mt-4 py-2 px-4 bg-red-500 hover:bg-red-700 text-white font-bold rounded"
              >
                X
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
