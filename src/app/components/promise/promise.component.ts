import { Component, OnInit } from '@angular/core';
import { concat, interval, map, merge, take } from 'rxjs';

@Component({
  selector: 'app-promise',
  templateUrl: './promise.component.html',
  styleUrls: ['./promise.component.scss']
})
export class PromiseComponent implements OnInit {

  concatSource: any;
  mergeSource: any;

  constructor() { }

  ngOnInit(): void {


    const source1 = interval(1000).pipe(
      map(res => "first task "+(res+1)),
      take(5)
    );

    const source2 = interval(3000).pipe(
      map(res => "second task "+(res+1)),
      take(3)
    );

    const source3 = interval(1500).pipe(
      map(res => "third task "+(++res)),
      take(6)
    );

    this.concatSource = concat(source1,source2,source3);
    this.mergeSource = merge(source1,source2,source3);



    let party = new Promise((resolve,reject)=>{
      // resolve("promise resolved");
      // reject("rejected");
      if(this.cashAvailable()){
        setTimeout(()=>{
          resolve("can be paid by cash");
        },3000);

      }
      else if(this.cashnotAvailable()) {
        setTimeout(()=>{
          resolve("can't be paid by cash");
        },3000);

      }
      else{
        reject("cant' pay");
      }
    });


    party.then(res=>{
      console.log("then code => ",res);
      }).catch(rej => {
      console.log(rej);
    })

  }

  myfunc() {
    console.log("Myfunc called")
  }


  cashAvailable(){
    return true;

  }

  cashnotAvailable() {
    return false;

  }

  cardPayment(){

  }


  concatCheck() {
    this.concatSource.subscribe((res: any) => {
      console.log(res);
    })
  }

  mergeCheck() {
    this.mergeSource.subscribe((res: any) => {
      console.log(res);
    })
  }



}
