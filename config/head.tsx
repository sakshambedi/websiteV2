// head.tsx
import Head from 'next/head';
import React from 'react';

export default function HeadResume() {
    return (
        <Head>

            {/* Open Graph meta tags */}
            <meta property="og:title" content="Saksham Bedi" />
            <meta property="og:description" content="Checkout Saksham ..." />
            <meta property="og:image" content="/path/to/image.jpg" />
            <meta property="og:url" content="https://www.sakshambedi.com" />
            <meta property="og:type" content="website" />

            {/* Twitter/X meta tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="My Awesome Website" />
            <meta name="twitter:description" content="This is the description for my website." />
            <meta property="twitter:image" content="Twitter link preview image URL"></meta>
        </Head>
    );
}