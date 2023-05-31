import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';



const rtx500 ={
  name: 'RTX500',
  price: 2500,
  inStorage: 100,
}

@Component({
  templateUrl: './basic-page.component.html',
  styles: [
  ]
})

export class BasicPageComponent implements OnInit {

  // public myForm: FormGroup = new FormGroup({
  //   // name: new FormControl('',[],[]), // valor x defecto, validacion asincronas , val
  //   name: new FormControl(''),
  //   price: new FormControl(0),
  //   inStorage: new FormControl(0),
  // });

  // forma diferente de crear un formulario
  public myForm: FormGroup = this.fb.group({
    name:['',[Validators.required, Validators.minLength(3)]],
    price:[0, [Validators.required, Validators.min(0)]],
    inStorage:[0,[Validators.required, Validators.min(0)]],
  })

  constructor(private fb: FormBuilder){}


  ngOnInit(): void {
    this.myForm.reset(rtx500);
    // this.myForm.reset();
  }

  // funcion para saber si es valido el campo
  isValidField(field:string):boolean | null{
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched
  }

  getFieldError(field:string):string | null{
    if (!this.myForm.controls[field]) return null;
    const errors = this.myForm.controls[field].errors || {}; //si no viene regresa vacio
    for (const key of Object.keys(errors)){
      switch(key){
        case 'required':
        return 'Este campo es requerido';
        case 'minlength':
        return `Minimo ${errors['minlength'].requiredLength} caracteres`;
      }
    }
    return '';
  }


  // posteo del formulario
  onSave():void{
    if(this.myForm.invalid) {// aqui verifico si es valido el form
      this.myForm.markAllAsTouched(); // marca a todos los campos como tocados
      return;
    }

    console.log(this.myForm.value);
    // this.myForm.reset({price:10, inStorage:50});
    this.myForm.reset({price:0, inStorage:0});
  }

}
