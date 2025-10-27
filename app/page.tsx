"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";

const gradient = "linear-gradient(135deg,#D82C9C,#EBA028)";
const glass =
  "bg-[rgba(255,255,255,0.06)] backdrop-blur-xl border border-[rgba(255,255,255,0.1)] rounded-2xl shadow-[0_6px_30px_rgba(0,0,0,0.6)]";

export default function Page() {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const [showAvailable, setShowAvailable] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    const runSequence = () => {
      setVisibleCards([]);
      setShowAvailable(false);
      timers.push(setTimeout(() => setVisibleCards([0]), 400)); // Ryan's email
      timers.push(setTimeout(() => setVisibleCards([0, 1]), 2200)); // Noah thinking
      timers.push(setTimeout(() => setVisibleCards([0, 1, 2]), 4400)); // Calendar
      timers.push(setTimeout(() => setShowAvailable(true), 5200));
      timers.push(setTimeout(() => setVisibleCards([0, 1, 2, 3]), 7200)); // Noah's follow-up
      timers.push(setTimeout(() => setVisibleCards([0, 1, 2, 3, 4]), 9500)); // John's reply
      timers.push(setTimeout(() => setVisibleCards([0, 1, 2, 3, 4, 5]), 11500)); // Noah's confirmation
      timers.push(setTimeout(runSequence, 18500)); // loop delay
    };

    runSequence();
    return () => timers.forEach(clearTimeout);
  }, []);

  // Scroll within iframe without affecting parent page
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "nearest",
      });
    }
  }, [visibleCards]);

  const cards = [
    // 1️⃣ Ryan’s Email
    {
      id: 0,
      content: (
        <div>
          <p className="text-sm text-gray-400">From: Ryan Brent</p>
          <p className="text-sm text-gray-400">To: John Ivy (john@gmail.com)</p>

          {/* Gradient Cc line */}
          <p className="text-sm font-medium">
            <span
              className="font-medium"
              style={{
                background: "linear-gradient(90deg, #D82C9C 0%, #EBA028 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Cc: noah@heynoah.io
            </span>
          </p>

          <div className="mt-4 leading-relaxed text-[15px]">
            <p>Hi John,</p>

            {/* Gradient body line */}
            <p
              className="my-3 font-medium"
              style={{
                background: "linear-gradient(90deg, #D82C9C 0%, #EBA028 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              I’ve Cc’d Noah who can help us find some time.
            </p>

            <p>
              Thanks,
              <br /> Ryan
            </p>
          </div>
        </div>
      ),
    },

    // 2️⃣ Noah’s Thinking
    {
      id: 1,
      content: (
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <Image
              src="/gradient-logo.png"
              alt="Noah Logo"
              width={24}
              height={24}
              className="inline-block"
            />
            <p className="font-semibold text-lg">Noah’s Thinking…</p>
          </div>
          <p className="italic text-sm text-gray-300 mt-2 ml-8">
            John’s meeting is high priority — I’ll move your low priority time
            blocks to free up some slots.
          </p>
        </div>
      ),
    },
    // 3️⃣ Calendar Shuffle — Ryan’s Calendar (Unified Radius)
    {
      id: 2,
      content: (
        <motion.div layout className="flex flex-col">
          <p className="font-semibold text-lg mb-2">Ryan’s Calendar</p>
          <p className="text-xs text-gray-400 mb-4">Wednesday, Nov 14, 2025</p>

          <motion.div
            layout
            transition={{
              layout: { type: "spring", stiffness: 220, damping: 26 },
            }}
            className="flex flex-col gap-3"
          >
            {/* Team Standup */}
            <motion.div
              layout
              className={`${glass} p-3 text-sm font-medium rounded-[18px]`}
            >
              Team Standup • 9:00 AM
            </motion.div>

            {/* Deep Work – shifts downward when new slots appear */}
            <motion.div
              layout
              transition={{
                layout: { type: "spring", stiffness: 200, damping: 24 },
              }}
              className={`${glass} p-3 text-sm font-medium rounded-[18px]`}
            >
              Deep Work • 10:00 AM
            </motion.div>

            {/* Noah inserts new available time slots */}
            <AnimatePresence>
              {showAvailable && (
                <>
                  {/* Available 11:30 AM */}
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="p-[2px] rounded-[18px] bg-gradient-to-r from-[#D82C9C] to-[#EBA028]"
                  >
                    <motion.div
                      layout
                      animate={{
                        boxShadow: [
                          "0 0 20px rgba(235,160,40,0.20)",
                          "0 0 28px rgba(235,160,40,0.28)",
                          "0 0 20px rgba(235,160,40,0.20)",
                        ],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="rounded-[18px] p-3 text-sm font-medium text-white backdrop-blur-xl
                             bg-[rgba(255,255,255,0.08)]"
                    >
                      Available • 11:30 AM
                    </motion.div>
                  </motion.div>

                  {/* Available 1:00 PM */}
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.15, duration: 0.7, ease: "easeOut" }}
                    className="p-[2px] rounded-[18px] bg-gradient-to-r from-[#D82C9C] to-[#EBA028]"
                  >
                    <motion.div
                      layout
                      animate={{
                        boxShadow: [
                          "0 0 20px rgba(235,160,40,0.20)",
                          "0 0 28px rgba(235,160,40,0.28)",
                          "0 0 20px rgba(235,160,40,0.20)",
                        ],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="rounded-[18px] p-3 text-sm font-medium text-white backdrop-blur-xl
                             bg-[rgba(255,255,255,0.08)]"
                    >
                      Available • 1:00 PM
                    </motion.div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>

            {/* Client Call */}
            <motion.div
              layout
              className={`${glass} p-3 text-sm font-medium rounded-[18px]`}
            >
              Client Call • 2:00 PM
            </motion.div>

            {/* Design Review */}
            <motion.div
              layout
              className={`${glass} p-3 text-sm font-medium rounded-[18px]`}
            >
              Design Review • 4:00 PM
            </motion.div>
          </motion.div>
        </motion.div>
      ),
    },

    // 4️⃣ Noah’s Follow-up
    {
      id: 3,
      content: (
        <div>
          <p className="text-sm text-gray-400">
            From:{" "}
            <span
              style={{
                background: gradient,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              noah@heynoah.io
            </span>
          </p>
          <p className="text-sm text-gray-400">To: Ryan Brent, John Ivy</p>

          <div className="mt-4 leading-relaxed text-[15px]">
            <p>Hi Ryan and John,</p>
            <p className="mt-2">
              Here are a few options that work for both of you:
              <br />• Wednesday, Nov 14 • 11:30 AM
              <br />• Wednesday, Nov 14 • 1:00 PM
              <br />• Friday, Nov 16 • 11:30 AM
            </p>
            <p className="mt-4">
              Feel free to adjust — I’ll handle the rest.
              <br />
              <span
                className="font-semibold"
                style={{
                  background: gradient,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Noah (Ryan’s Executive Assistant)
              </span>
            </p>
          </div>
        </div>
      ),
    },

    {
      id: 4,
      content: (
        <div>
          <p className="text-sm text-gray-400">From: John Ivy</p>
          <p className="text-sm text-gray-400">To: Ryan Brent, Noah</p>

          <div className="mt-4 leading-relaxed text-[15px]">
            <p>Hi both,</p>
            <p className="my-3 font-medium">
              Wednesday • 1:00 PM works for me — thanks Noah for arranging.
            </p>
            <p>
              Best,
              <br /> John
            </p>
          </div>
        </div>
      ),
    },

    {
      id: 5,
      content: (
        <div>
          <p className="text-sm text-gray-400">
            From:{" "}
            <span
              className="font-medium"
              style={{
                background: "linear-gradient(90deg, #D82C9C 0%, #EBA028 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              noah@heynoah.io
            </span>
          </p>
          <p className="text-sm text-gray-400">To: Ryan Brent, John Ivy</p>

          <div className="mt-4 leading-relaxed text-[15px]">
            <p>Hi Ryan and John,</p>
            <p className="mt-2 font-medium">
              Perfect — meeting confirmed for Wednesday • 1:00 PM.
              <br />
              I’ve sent calendar invites to both of you.
            </p>
            <p className="mt-4">
              <span
                className="font-semibold"
                style={{
                  background:
                    "linear-gradient(90deg, #D82C9C 0%, #EBA028 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Noah (Ryan’s Executive Assistant)
              </span>
            </p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <main
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b
                 from-[#0B0B0C] to-[#151515] text-[#EAEAEA] overflow-hidden px-4 sm:px-6 py-5 sm:py-8"
    >
      <div
        className="w-full max-w-md sm:max-w-lg lg:max-w-xl flex flex-col gap-4
                   transition-all duration-700"
      >
        <AnimatePresence>
          {visibleCards.map((id) => (
            <motion.div
              key={id}
              ref={
                id === visibleCards[visibleCards.length - 1] ? scrollRef : null
              }
              initial={{ opacity: 0, y: 70 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.8, 0.25, 1] }}
              layout
              className={`${glass} p-5`}
            >
              {cards[id].content}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </main>
  );
}
