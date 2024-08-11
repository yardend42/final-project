export class Vacation {
  vacation_id: number;
  destination: string;
  description: string;
  start_date: Date;
  end_date: Date;
  price: number;
  image_filename: string;

  constructor(
    vacation_id: number,
    destination: string,
    description: string,
    start_date: Date,
    end_date: Date,
    price: number,
    image_filename: string
  ) {
    this.vacation_id=vacation_id
    this.destination = destination;
    this.description = description;
    this.start_date = start_date;
    this.end_date = end_date;
    this.price = price;
    this.image_filename = image_filename;
  }
}
