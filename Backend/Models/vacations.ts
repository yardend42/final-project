export class Vacation {
  destination: string;
  description: string;
  start_date: Date;
  end_date: Date;
  price: number;
  image_filename: string;
  vacation_id?:number;

  constructor(
    destination: string,
    description: string,
    start_date: Date,
    end_date: Date,
    price: number,
    image_filename: string,
    vacation_id?:number
  ) {
    this.destination = destination;
    this.description = description;
    this.start_date = start_date;
    this.end_date = end_date;
    this.price = price;
    this.image_filename = image_filename;
    this.vacation_id=vacation_id
  }
}
