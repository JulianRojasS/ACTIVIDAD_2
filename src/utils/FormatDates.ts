
// FormatDates.ts
// Este archivo contiene la clase FormatDates que se encarga de formatear fechas y horas
// en un formato específico. La clase toma una fecha proporcionada y ofrece métodos para
// obtener la fecha en formato YYYY-MM-DD y un timestamp en formato YYYY-MM-DD HH:MM:SS.
export class FormatDates {
  provided: Date;

  // Constructor que recibe una fecha como parámetro
  // y la almacena en la propiedad provided.
  constructor (provided: Date) {
    this.provided = provided;
  }

  // Método que devuelve la fecha en formato YYYY-MM-DD
  getDate () {
    return `${this.provided.getFullYear()}-${this.provided.toISOString().split("-")[1]}-${this.provided.getDate()}`
  }

  // Método que devuelve la fecha y hora en formato YYYY-MM-DD HH:MM:SS
  getTimeStamp () {
    const date = this.getDate()
    return `${date} ${this.formartTimes(this.provided.getHours())}:${this.formartTimes(this.provided.getMinutes())}:${this.formartTimes(this.provided.getSeconds())}`
  }

  // Método privado que formatea un número para que tenga dos dígitos
  private formartTimes = (num: number): string => {
    return num.toString().padStart(2, "0");
  };
}