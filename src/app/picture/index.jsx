"use client";
import React from "react";
import { Camera } from "react-camera-pro";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useQRCode } from "next-qrcode";
import {
  ArrowUpCircleIcon,
  DocumentIcon,
  CameraIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useMediaQuery } from "react-responsive";

export default function TakePicturePage() {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const router = useRouter();
  const [ratio, setRatio] = useState(20 / 20);
  const [image, setImage] = useState(null);
  const camera = useRef(null);
  const [rotated, setRotated] = useState(false);
  const [uuid, setUUID] = useState("");
  const [qrCode, setShowQR] = useState(false);
  const [numberOfCameras, setNumberOfCameras] = useState(0);

  const rotateImage = (imageBase64, rotation, cb) => {
    var img = new Image();
    img.src = imageBase64;
    img.onload = () => {
      var canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      var ctx = canvas.getContext("2d");
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(img, 0, 0);
      cb(canvas.toDataURL("image/jpeg"));
    };
  };

  const capture = () => {
    const imageSrc = camera.current.takePhoto();
    if (!rotated) {
      rotateImage(imageSrc, 90, (image) => {
        setImage(image);
        localStorage.setItem("myPhoto", image);
        //router.push("/result_photo");
      });
    } else {
      setImage(imageSrc);
      localStorage.setItem("myPhoto", imageSrc);
      //router.push("/result_photo");
    }
  };

  async function save() {
    if (!image) {
      alert("Please take an image first!");
      return;
    }

    const fetchResponse = await fetch(image);

    const blob = await fetchResponse.blob();
    const formData = new FormData();
    formData.append("image", blob, "image.jpg");

    try {
      const response = await fetch(
        "https://so-lfie-backend.vercel.app/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();

      setUUID(result.uuid);
      setShowQR(true);

      if (response.ok) {
        console.log(" uploaded successfully");
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error("Upload error:", error);
    }
  }

  const reset = () => {
    if (qrCode) {
      setShowQR(false);
    }
    if (image) {
      setImage(null);
    }
  };

  const switchCamera = () => {
    if (camera.current) {
      camera.current.switchCamera();

      if (!rotated) {
        setRotated(true);
      } else {
        setRotated(false);
      }
    }
  };

  const route = (uuid) => {
    router.push("/mint/" + uuid.toString());
  };

  const { Canvas } = useQRCode();

  return (
    <div className="bg-white">
      {isMobile ? (
        <div>
          <header className="absolute inset-x-0 top-0 z-50">
            <nav
              aria-label="Global"
              className="flex items-center justify-between p-6 lg:px-8"
            >
              <div className="flex lg:flex-1">
                <a href="#" className="-m-1.5 p-1.5">
                  <span className="sr-only">SuperTeam</span>
                  <img
                    alt=""
                    src="/images/superteam-ftext.png"
                    className="h-[100%] w-[50%] object-cover object-center"
                  />
                </a>
              </div>
            </nav>
          </header>

          <div className="bg-white">
            <div className="max-w-2xl sm:px-3 sm:py-32 lg:px-8">
              <div className="relative h-[650px] isolate overflow-hidden bg-orange/90 px-2 pt-26 shadow-2xl sm:rounded-3xl sm:px-25 md:pt-14 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
                <div className="mx-auto text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
                  {qrCode ? (
                    <div className="flex mt-[2%] flex-col items-center mb-10">
                      <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        Mint Your SOLFie
                      </h2>
                    </div>
                  ) : (
                    <div className="flex mt-[2%] flex-col items-center mb-10">
                      <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        Take A SOLFie
                      </h2>
                    </div>
                  )}

                  {qrCode && (
                    <div className="flex mt-[2%] flex-col items-center mb-10">
                      <Canvas
                        text={"https://solfie.fun/mint/" + uuid}
                        options={{
                          errorCorrectionLevel: "M",
                          margin: 3,
                          scale: 4,
                          width: 200,
                          color: {
                            dark: "#0c0706",
                            light: "#fff",
                          },
                        }}
                      />

                      <div
                        className="mt-10 text-2xl text-white"
                        onClick={() => route(uuid)}
                      >
                        Or Click Here!
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-center gap-x-6 lg:justify-start">
                    {image ? (
                      <div className="mt-5 flex items-center justify-center gap-x-6">
                        <a
                          onClick={reset}
                          href="#"
                          className="flex items-center gap-2 rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-black"
                        >
                          <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                          Reset
                        </a>

                      {!qrCode && image && (
                          <a
                            onClick={save}
                            disabled={qrCode}
                            href="#"
                            className="flex items-center gap-2 rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-black"
                          >
                            <DocumentIcon
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                            Upload
                          </a>
                        )}
                      </div>
                    ) : (
                      <div className="mt-5 flex items-center justify-center gap-x-6">
                        <a
                          onClick={capture}
                          href="#"
                          className="flex items-center gap-2 rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-black"
                        >
                          <ArrowUpCircleIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                          Save
                        </a>

                        {numberOfCameras > 1 && !image && !qrCode && (
                          <a
                            onClick={switchCamera}
                            href="#"
                            className="flex items-center gap-2 rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-black"
                          >
                            <CameraIcon
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                            Switch
                          </a>
                        )}

                        {!qrCode && image && (
                          <a
                            onClick={save}
                            disabled={qrCode}
                            href="#"
                            className="flex items-center gap-2 rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-black"
                          >
                            <DocumentIcon
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                            Upload
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mx-auto mt-[10%] grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200" />

                <div className="relative mt-16 h-80 lg:mt-8">
                  {!qrCode && !image && (
                    <div>
                      <Camera
                        ref={camera}
                        numberOfCamerasCallback={setNumberOfCameras}
                        facingMode="user"
                        aspectRatio={ratio}
                      />
                    </div>
                  )}
                  {!qrCode && image && (
                    <div className="flex flex-col items-center mt-4 mb-10">
                      <img
                        src={image}
                        alt="Captured"
                        className="w-[100%] max-w-[900px] rounded-lg"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <header className="absolute inset-x-0 top-0 z-50">
            <nav
              aria-label="Global"
              className="flex items-center justify-between p-6 lg:px-8"
            >
              <div className="flex lg:flex-1">
                <a href="#" className="-m-1.5 p-1.5">
                  <span className="sr-only">SuperTeam</span>
                  <img
                    alt="SuperTeam"
                    src="/images/superteam-ftext.png"
                    className="h-12 w-auto object-cover object-center" // Adjusted for responsiveness
                  />
                </a>
              </div>
            </nav>
          </header>

          <div className="bg-white">
            <div className="full-w p-10 mt-[10%] rounded-lg">
              <div className="relative isolate overflow-hidden bg-orange/90 px-4 py-12 shadow-2xl rounded-lg">
                <div className="mx-auto text-center lg:mx-0 lg:flex-auto lg:py-16 lg:text-left">
                  <h2 className="text-5xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
                    Take A SOLFie
                  </h2>

                  {qrCode && (
                    <div className="flex mt-6 flex-col items-center mb-8">
                      <Canvas
                        text={"https://solfie.fun/mint/" + uuid}
                        options={{
                          errorCorrectionLevel: "M",
                          margin: 3,
                          scale: 4,
                          width: 250,
                          color: {
                            dark: "#0c0706",
                            light: "#fff",
                          },
                        }}
                      />
                    </div>
                  )}

                  <div className="flex items-center justify-center gap-x-6 lg:justify-start">
                    {image ? (
                      <div className="mt-5 flex items-center justify-center gap-x-10">
                        <a
                          onClick={reset}
                          href="#"
                          className="flex items-center gap-2 rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-black"
                        >
                          <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                          Reset
                        </a>

                        {!qrCode && (
                          <a
                            onClick={save}
                            disabled={qrCode}
                            href="#"
                            className="flex items-center gap-2 rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-black"
                          >
                            <DocumentIcon
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                            Upload
                          </a>
                        )}
                      </div>
                    ) : (
                      <div className="mt-5 flex items-center justify-center gap-x-6">
                        <a
                          onClick={capture}
                          href="#"
                          className="flex items-center gap-2 rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-black"
                        >
                          <ArrowUpCircleIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                          Save
                        </a>

                        {!qrCode && (
                          <a
                            onClick={save}
                            disabled={qrCode}
                            href="#"
                            className="flex items-center gap-2 rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-black"
                          >
                            <DocumentIcon
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                            Upload
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mx-auto mt-10 max-w-xl lg:mt-0">
                  {!qrCode && !image && (
                    <div>
                      <Camera
                        ref={camera}
                        numberOfCamerasCallback={setNumberOfCameras}
                        facingMode="user"
                        aspectRatio={ratio}
                      />
                    </div>
                  )}
                  {!qrCode && image && (
                    <div className="flex flex-col items-center mt-4">
                      <img
                        src={image}
                        alt="Captured"
                        className="w-full rounded-lg" // Adjusted for responsiveness
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
