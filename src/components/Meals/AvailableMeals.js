import { useState,useEffect } from "react";

import MealItem from "./MealItem/MealItem";
import Card from "../UI/Card";

import classes from './AvailableMeals.module.css';
  

  function AvailableMeals(){
    const [mealsAvailable, setMealsAvailable] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [err, setErr] = useState('');
    useEffect(()=>{
      function getMeals(){
        fetch('https://food-delivery-75541-default-rtdb.firebaseio.com/meals.json',{
          method:'GET',
          headers:{
            "Access-Control-Allow-Origin": "*"
          }
        })
          .then(res=>{ 
            //console.log(res);
            return res.json();
          }).then(result=>{
            //console.log(result,'fetch');
            let arr = [];
            for (let key in result){
              arr.push(result[key]);
            };
            //console.log(arr);
            
            setMealsAvailable(prev=>[...prev,...arr]);
            //console.log('last');
            setIsLoading(false);
          })
              .catch(err =>{
                setIsLoading(false);
                setErr(err);
              });
      };
      getMeals();
    },[]);

    if(isLoading){
      return (
        <section className={classes.MealsLoading}>
          <p>...Loading</p>
        </section>
      );
    };

    if(err){
      console.log(err,'@@@@@@@@@@@@@@@@');
      return(
      <section className={classes.MealsError}>
          <p>{err.message}</p>
        </section>);
    };

    let meals =mealsAvailable.map(meal=>{
      return <MealItem key={meal.id} meal={{...meal}}/>
    });
    return (
      <section className={classes.meals}>
      <Card>
        <ul>
        {meals}
      </ul>
      </Card>
      </section>
    );
  };

  export default AvailableMeals;