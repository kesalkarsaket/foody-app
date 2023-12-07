import React, { useEffect, useState } from "react";
const Help = () => {
  const [onboardingData, setOnboardingData] = useState([]);
  const [legalData, setLegalData] = useState([]);
  const [faq, setFaq] = useState([]);
  const [showContent, setShowContent] = useState(false);
  useEffect(() => {
    fetchHelpData();
    fetchLegalData();
    fetchFaqData();
  }, []);

  const fetchHelpData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/support/issues/partner-onboarding?"
    );
    const jsonNew = await data.json();

    setOnboardingData(jsonNew?.data?.issues?.data);
  };
  const fetchLegalData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/support/issues/partner-onboarding?"
    );
    const jsonNew = await data.json();

    setLegalData(jsonNew?.data?.issues?.data);
  };
  const fetchFaqData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/support/issues/partner-onboarding?"
    );
    const jsonNew = await data.json();

    setFaq(jsonNew?.data?.issues?.data);
  };

  const handleClick = () => {
    setShowContent(!showContent);
  };

  function OnboardingList({ items }) {
    return (
      <div>
        {items.map((item, id) => (
          <div key={item.id}>
            <span>{item?.description}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className=" justify-center px-96">
        <div>
          <h1 className="font-bold">Partner Onboarding</h1>
          {onboardingData.map((item, index) => (
            <div key={index} className="border border-black">
              <div
                className={`p-2 m-2 border border-gray-100 bg-gray-300 flex justify-between ${
                  showContent ? "cursor-pointer" : ""
                }`}
                onClick={handleClick}
              >
                <h1 className="font-bold">{item?.title}</h1>
                <span> {showContent ? "▼" : "▼"}</span>
              </div>
              {showContent && (
                <div className="w-8/12 px-4">
                  <OnboardingList items={[item]} />
                </div>
              )}
            </div>
          ))}
          <h1 className="font-bold">Legal</h1>
          {onboardingData.map((item, index) => (
            <div key={index} className="border border-black">
              <div
                className={`p-2 m-2 border border-gray-100 bg-gray-300 flex justify-between ${
                  showContent ? "cursor-pointer" : ""
                }`}
                onClick={handleClick}
              >
                <h1 className="font-bold">{item?.title}</h1>
                <span> {showContent ? "▼" : "▼"}</span>
              </div>
              {showContent && (
                <div className="w-8/12 px-4">
                  <OnboardingList items={[item]} />
                </div>
              )}
            </div>
          ))}
          <h1 className="font-bold">FAQs</h1>
          {onboardingData.map((item, index) => (
            <div key={index} className="border border-black">
              <div
                className={`p-2 m-2 border border-gray-100 bg-gray-300 flex justify-between ${
                  showContent ? "cursor-pointer" : ""
                }`}
                onClick={handleClick}
              >
                <h1 className="font-bold">{item?.title}</h1>
                <span> {showContent ? "▼" : "▼"}</span>
              </div>
              {showContent && (
                <div className="w-8/12 px-4">
                  <OnboardingList items={[item]} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Help;
