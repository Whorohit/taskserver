import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Getnews, setBy, setpage, setquery, settags, settime } from '../Redux/slice';
import { Box, Pagination } from '@mui/material';
import moment from 'moment';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isFirstLoad, setIsFirstLoad] = useState(true);  // Track initial load state
  const [searchParams, setSearchParams] = useSearchParams();
  const [news, setNews] = useState([]);

  const { query, tags, by, time, page } = useSelector((state) => state.slice);

  const stripHTML = (text) => {
    const doc = new DOMParser().parseFromString(text, "text/html");
    return doc.body.textContent || "";
  };
  useEffect(() => {
    const queryParam = searchParams.get("query") || "";
    const tagsParam = searchParams.get("tags") || "story";
    const byParam = searchParams.get("by") || 0;
    const timeParam = searchParams.get("time") || -1;
    const pageParam = searchParams.get("page") || "0";

    dispatch(setquery(queryParam));
    dispatch(settags(tagsParam));
    dispatch(setBy(byParam));
    dispatch(settime(timeParam));
    dispatch(setpage(pageParam));

  }, [dispatch, searchParams]);


  // // Update URL search parameters based on tags, by, time, and page
  useEffect(() => {
    if (!isFirstLoad) {

      setSearchParams({
        query: query || "",
        tags: tags || "",
        by: by || "",
        time: time || "",
        page: page || "0",
      });
    }
  }, [query, tags, by, time, page]);

  // Fetch news data on first load without any filters and then based on changes in query, tags, by, time, or page
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const fetchParams = isFirstLoad ? {} : { query, tags, by, time, page };
        const result = await dispatch(Getnews(fetchParams));
        setNews(result.payload.hits);
        if (isFirstLoad) {
          setIsFirstLoad(false);
        }
      } catch (error) {
        console.error(error);
        setNews([]);
      }
    };

    fetchNews();
  }, [query, tags, by, time, page, dispatch, isFirstLoad]);
  const handlePageChange = (event, value) => {
    dispatch(setpage(value - 1));  // Pagination is 1-based; adjust for 0-based index
  };

  return (
    <Box className="w-full mx-auto bg-[#f6f6ef] px-2 py-2 md:w-4/5 h-full">
      {news.map((info) => {
        const days = moment(info.created_at).startOf('days').fromNow();
        return (
          <Box key={info.id} className="flex flex-col gap-y-1 justify-start my-2">
            <h1 className="flex justify-start items-center gap-1 text-sm flex-wrap text-black">
              {info.title ? info.title : stripHTML(info.comment_text)}
              {info.url && (
                <a
                  href={info.url ? info.url : ""}
                  className="break-words no-underline hover:underline text-gray-400 text-sm"
                >
                  {`(${info.url ? info.url : info.story_url})`}
                </a>
              )}
            </h1>
            <Box className="flex justify-start items-center gap-1 text-gray-400 text-sm">
              <h1>{info.points} points</h1>
              <h1>|</h1>
              <h1>{info.author}</h1>
              <h1>|</h1>
              <h1>{days}</h1>
              <h1>|</h1>
              <h1>{info.num_comments} comments</h1>
            </Box>
          </Box>
        );
      })}
      <Box className="flex justify-center items-center">
        <Pagination
          count={50}
          variant="outlined"
          shape="rounded"
          page={page + 1} // Adjust for 1-based pagination display
          onChange={handlePageChange}
        />
      </Box>
    </Box>
  );
};

export default Home;
