"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";

interface WhyUsAnimatedImageProps {
    image: string;
    alt: string;
    activeIndex: number;
}

function WhyUsAnimatedImage({ image, alt, activeIndex }: WhyUsAnimatedImageProps) {
    return (
        <div className="w-full md:w-[60%] relative overflow-hidden rounded-[0.75rem]">
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="w-full"
                >
                    <Image
                        src={image}
                        alt={alt}
                        width={736}
                        height={495}
                        quality={100}
                        className="w-full object-cover rounded-[0.75rem]"
                    />
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

export default WhyUsAnimatedImage;

