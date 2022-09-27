import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { concat, forkJoin, from, fromEvent, interval, map, merge, take, zip } from 'rxjs';

@Component({
  selector: 'app-promise',
  templateUrl: './promise.component.html',
  styleUrls: ['./promise.component.scss']
})
export class PromiseComponent implements OnInit , AfterViewInit{

  concatSource: any;
  mergeSource: any;

  @ViewChild('inputVal') text?: ElementRef;
  @ViewChild('inputVal1') text1?: ElementRef;

  constructor() { }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.

    const inputText1 = fromEvent<any>(this.text1?.nativeElement, 'keyup').pipe(
      map(res=> res.target.value),
      take(6)
    );

    const inputText = fromEvent<any>(this.text?.nativeElement, 'keyup').pipe(
      map(res=> res.target.value),
      take(5)
    );

    // inputText.subscribe(res => {
    //   console.log(res);
    // })
    // console.log(inputText);

    zip(inputText, inputText1).subscribe(([txt1,txt2])=>{
      console.log("zip = ",txt1," ",txt2);
    });

    forkJoin(inputText, inputText1).subscribe(([txt1,txt2])=>{
      console.log("forkjoin =",txt1," ",txt2);
    });
  }

  ngOnInit(): void {

    const ara = from([1,2,3,4,5,6,7,8,9]);

    ara.subscribe(res=>{
      // console.log(res);
    });

    const val = ara.subscribe(res=>{
      map(res => res);
    })

    console.log(val)


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
