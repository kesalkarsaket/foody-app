import RestaurantCard, { withPromtedLabel } from "./RestaurantCard";
import { useState, useEffect, useContext } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
const Body = () => {
  // Local State Variable - Super powerful variable
  const [listOfRestaurants, setListOfRestraunt] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [showCuisines, setShowCuisines] = useState([]);

  const RestaurantCardPromoted = withPromtedLabel(RestaurantCard);

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 5, // You can adjust the number of slides shown at a time
    slidesToScroll: 1,
    arrows: true,
  };

  // Whenever state variables update, react triggers a reconciliation cycle(re-renders the component)

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=19.0451663&lng=73.0121082&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );

    const json = await data.json();
    // Optional Chaining
    setListOfRestraunt(
      json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setFilteredRestaurant(
      json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );

    setShowCuisines(json?.data?.cards[1]?.card?.card?.imageGridCards);
  };

  const onlineStatus = useOnlineStatus();

  const { loggedInUser, setUserName } = useContext(UserContext);
  const MEDIA_URL =
    "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/";

  const slideLeft = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  return listOfRestaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <>
      <div className="body">
        <div className="filter flex">
          <div className="search m-4 py-4 px-20">
            <input
              type="text"
              data-testid="searchInput"
              className="border border-solid border-black"
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
            />
            <button
              className="px-4 py-2 bg-green-100 m-4 rounded-lg"
              onClick={() => {
                // Filter the restraunt cards and update the UI
                // searchText
                console.log(searchText);

                const filteredRestaurant = listOfRestaurants.filter((res) =>
                  res.info.name.toLowerCase().includes(searchText.toLowerCase())
                );

                setFilteredRestaurant(filteredRestaurant);
              }}
            >
              Search
            </button>
          </div>
          <div className="search m-4 p-4 flex items-center">
            <button
              className="px-4 py-2 bg-gray-100 rounded-lg"
              onClick={() => {
                const filteredList = listOfRestaurants.filter(
                  (res) => res.info.avgRating > 4
                );
                setFilteredRestaurant(filteredList);
              }}
            >
              Top Rated Restaurants
            </button>
          </div>
          <div className="search m-4 p-4 flex items-center">
            <label>UserName : </label>
            <input
              className="border border-black p-2"
              value={loggedInUser}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
        </div>
        <div>
          <h1 className="font-bold px-20 text-lg ">What's on your Mind?</h1>
          <div className=" flex justify-end px-20">
            <span
              className="opacity-50 cursor-pointer hover:opacity-100 "
              onClick={slideLeft}
            >
              ◀
            </span>
            <span
              className="opacity-50 cursor-pointer hover:opacity-100  "
              onClick={slideRight}
            >
              ▶
            </span>
          </div>

          <div className="relative flex items-center mx-16">
            <div
              id="slider"
              className="w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth "
              style={{ overflowX: "clip", overflowY: "hidden" }}
            >
              {showCuisines?.info?.map((item) => (
                <img
                  className="w-[180] inline-block p-2 cursor-pointer hover:scale-105 ease-in-out duration-300"
                  alt="/"
                  src={MEDIA_URL + item?.imageId}
                ></img>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center">
          {filteredRestaurant.map((restaurant) => (
            <Link
              key={restaurant?.info.id}
              to={"/restaurants/" + restaurant?.info.id}
            >
              {restaurant?.info.promoted ? (
                <RestaurantCardPromoted resData={restaurant?.info} />
              ) : (
                <RestaurantCard resData={restaurant?.info} />
              )}
            </Link>
          ))}
        </div>
      </div>
      <div className="px-[500]">
        {onlineStatus ? (
          <div className="p-2 m-2 border border-solid bg-black rounded-lg">
            <h1 className="text-green-400 text-center"> Back Online</h1>
          </div>
        ) : (
          <div className="p-2 m-2 border border-solid bg-black rounded-lg">
            <h1 className="text-red-400 text-center">
              Looks like you're offline!! Please check your internet connection
            </h1>
          </div>
        )}
      </div>
    </>
  );
};

export default Body;
