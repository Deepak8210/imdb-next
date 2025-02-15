"use client";

import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";

interface IframeYoutubeProps {
  open: boolean;
  onClose: () => void;
  videoKey: string;
}

export default function IframeYoutube({
  open,
  onClose,
  videoKey,
}: IframeYoutubeProps) {
  return (
    <Dialog open={open} onClose={onClose} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center text-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg text-left transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-3xl sm:p-8 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="absolute right-8 top-2 hidden sm:block">
              <button
                type="button"
                onClick={onClose}
                className="rounded-md text-gray-400 hover:text-red-500"
              >
                <span className="sr-only">Close</span>
                Close
              </button>
            </div>
            <div className="w-full h-[500px]">
              <iframe
                className="w-full h-full rounded-lg"
                src={`https://www.youtube.com/embed/${videoKey}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
