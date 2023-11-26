'use client'
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function Home() {
  const router = useRouter();

  const [subscriptions, setSubscriptions] = useState<Record<string, { formattedDate: string; price: number }> | null>(null);
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setSubscriptions(data);
          router.push('/login')
        } else {
          console.error('Error uploading file:', response.statusText);
        }
      } catch (error : any) {
        console.error('Error uploading file:', error.message);
      }
    }
  };
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div className='w-96'>
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-10 h-10 mb-3 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  ></path>
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span>
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  PDF Files only
                </p>
              </div>
              <form
              >
                <input title="file" type="file" name="file" onChange={handleFileUpload} />
                <button type="submit"
                  className="w-1/2 box-content inline-flex items-center justify-center px-3 py-2 bg-blue-600 border border-transparent transition-transform hover:scale-105 rounded-md font-semibold capitalize text-white hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:border-red-700 focus:ring focus:ring-red-200 disabled:opacity-25 cursor-pointer"
                >
                  Upload
                </button>            </form>{" "}
            </label>
          </div>
          <script src="https://unpkg.com/flowbite@1.4.0/dist/flowbite.js"></script>
        </div>      </div>
      
    </main>
  );
}