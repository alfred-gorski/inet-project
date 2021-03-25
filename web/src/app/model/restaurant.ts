export class RestauInfo {
  title: string;
  type: string;
  location: string;
  phone: string;
  description: string;
  image: string;

  constructor(title: string,
    type: string,
    location: string,
    phone: string,
    description: string,
    image: string) {
    this.title = title;
    this.type = type;
    this.location = location;
    this.phone = phone;
    this.description = description;
    this.image = image;
  }
}

export class RestauResponse {
  id: number;
  restauinfo: RestauInfo;
  favorited: boolean;

  constructor(id: number, restauinfo: RestauInfo, favorited: boolean) {
    this.id = id;
    this.restauinfo = restauinfo;
    this.favorited = favorited;
  }
}
