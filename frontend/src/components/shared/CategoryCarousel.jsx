import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel';
import { Button } from '../ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "FullStack Developer",
  "Software Development",
  "Flutter Development"
]
const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/Browse");
   
  }

  return (
    <div className="my-10">
      <Carousel className="w-full mx-auto my-15 max-w-xl md:max-w-xl sm:max-w-sm">
        <CarouselContent className="space-x-4 sm:space-x-2">
          {
            category.map((cat , index) => (
              <CarouselItem className="flex justify-center">
                <Button onClick={()=> searchJobHandler(cat)} variant="outline" className="font-bold rounded-full md:w-full lg:w-auto">{cat}</Button>
              </CarouselItem>
            ))
          }
        </CarouselContent>
        <CarouselPrevious className="absolute left-2 top-1/2 transform -translate-y-1/2 sm:block"/>
        <CarouselNext className="absolute right-2 top-1/2 transform -translate-y-1/2 sm:block"/>
      </Carousel>
    </div>
  )
}

export default CategoryCarousel;;
