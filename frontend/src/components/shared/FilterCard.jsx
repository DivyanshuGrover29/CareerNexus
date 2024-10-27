import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Label } from '../ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'

const filterData = [ 
  {
     filterType:"Location",
     array:["Delhi" , "Noida" , "Gurgaon" , "Pune" , "Bangalore", "Mumbai"]
  },

  {
    filterType:"Industry",
    array:["Frontend Developer","Backend Developer","Data Science","Graphic Designer","FullStack Developer","Software Development","Flutter Development"]
  },

  {
    filterType:"Salary",
    array:["5" , "10" , "15" , "25"]
  },
]

const FilterCard = () => {
    //Ek local state create kri
    const [selectedValue , setSelectedValue] = useState('')//empty string rkh dia
    const dispatch = useDispatch();
    
    const changeHandler =(value) => {
      setSelectedValue(value);
    }

    useEffect(()=>{
         dispatch(setSearchedQuery(selectedValue));
    },[selectedValue]);//box me jo likha usse pata chltaa kis kis time hona chaie jab jab hm value select kre


  return (
    <div className='w-full rounded-md p-2 shadow-md'>
      <h1 className='font-bold text-lg'>Filter Jobs</h1>
      <hr className='mt-2 mb-3'/>
      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {
          filterData.map((data,index )=>(
            <div>
               <h1 className='font-bold text-lg'>{data.filterType}</h1>
               {
                data.array.map((item ,idx)=>{
                  //ek unique key dali 
                  const itemId = `id${index}-${idx}`;
                  return (
                    <div className='flex item-center space-x-2 my-2'>
                    <RadioGroupItem value={item} id={itemId} />
                    <Label htmlFor={itemId}>{item}</Label>
                    </div>
                )
               })
              }
            </div>
          ))
        }
      </RadioGroup>
    </div>
  )
}

export default FilterCard