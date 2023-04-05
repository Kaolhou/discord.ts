import { AxiosStatic } from "axios";

export interface Cookie {
  name: string;
  value: string;
  domain?: string;
  path?: string;
  expires?: Date;
  maxAge?: number;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: "strict" | "lax" | "none";
}
interface token {
  [key: string]: Cookie;
}
export interface meme {
  bgColor: string;
  canRepublish: boolean;
  canRemove: boolean;
  captionBottomText: string;
  captionText: string;
  comments: number;
  copyright: object;
  created: number;
  description: string;
  id: string;
  isAbused: boolean;
  isFeatured: boolean;
  isPinned: boolean;
  isRepublished: boolean;
  isSmiled: boolean;
  isUnsmiled: boolean;
  fixedTitle: string;
  link: string;
  published: number;
  republished: number;
  smiles: number;
  state: string;
  thumb: object;
  title: string;
  url: string;
  canonical: string;
  creator: string;
  source: string | null;
  ocr: string;
  screen: string;
  shotStatus: string;
  size: {
    w: number;
    h: number;
  };
  tags: string[];
  type: string;
  risk: number;
}

interface featuredI {
  items: meme[];
  pageCount: number;
}
interface ifunnyOptions {
  axios: AxiosStatic;
  token?: token;
}
class Ifunny {
  public token: token | undefined;
  private axios: AxiosStatic;
  base: string;
  constructor({ token, axios }: ifunnyOptions) {
    this.axios = axios;
    this.base = "https://br.ifunny.co";
    if (token) {
      this.token = token;
    }
  }

  getKeyToken(params: "sound=off" | "CID" | "x-csrf-token") {
    return this.token![params];
  }
  //thanks chatgpt🙏🏻🙏🏻
  private parseCookie(cookieStr: string): Cookie | null {
    if (!cookieStr) {
      return null;
    }

    const cookie: Cookie = {
      name: "",
      value: "",
    };

    const parts = cookieStr.split(";");

    parts.forEach((part) => {
      const [key, value] = part.trim().split("=");

      switch (key.toLowerCase()) {
        case "domain":
          cookie.domain = value;
          break;
        case "path":
          cookie.path = value;
          break;
        case "expires":
          cookie.expires = new Date(value);
          break;
        case "max-age":
          cookie.maxAge = parseInt(value, 10);
          break;
        case "secure":
          cookie.secure = true;
          break;
        case "httponly":
          cookie.httpOnly = true;
          break;
        case "samesite":
          cookie.sameSite = value.toLowerCase() as "strict" | "lax" | "none";
          break;
        default:
          cookie.name = key;
          cookie.value = value;
          break;
      }
    });

    if (!cookie.name || !cookie.value) {
      return null;
    }

    return cookie;
  }
  async getMemes(page: number) {
    const a = await this.axios.get<featuredI>(
      this.base + `/api/v1/feeds/featured?page=${page}`,
      {
        headers: {
          Host: "br.ifunny.co",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/109.0",
          Accept: "application/json",
          "Accept-Language": "pt-BR,pt;q=0.8,en-US;q=0.5,en;q=0.3",
          "Accept-Encoding": "gzip, deflate, br",
          Referer: "https://br.ifunny.co/",
          "content-type": "application/json",
          "x-requested-with": "fetch",
          "x-csrf-token": `${this.getKeyToken("x-csrf-token")}`,
          Connection: "keep-alive",
          Cookie: `_ga=GA1.2.1672052505.1676404920; _gid=GA1.2.380679575.1676584645; x-csrf-token=${this.getKeyToken(
            "x-csrf-token"
          )}; CID=4601e9df760070547dd772906a22d4a284d3e20d608883478c2ac223cff646f3.c8c4f4bd74cafc67; sound=off; viewMode=list; _gcl_au=1.1.1869651032.1676586845`,
          "Sec-Fetch-Dest": "empty",
          "Sec-Fetch-Mode": "same-origin",
          "Sec-Fetch-Site": "same-origin",
          TE: "trailers",
        },
        validateStatus() {
          return true;
        },
      }
    );
    return a.data;
  }
  public async getToken() {
    const a = await this.axios.post(
      this.base,
      {},
      {
        headers: {
          Host: "br.ifunny.co",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/109.0",
          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
          "Accept-Language": "pt-BR,pt;q=0.8,en-US;q=0.5,en;q=0.3",
          "Accept-Encoding": "gzip, deflate, br",
          Connection: "keep-alive",
          "Upgrade-Insecure-Requests": "1",
          "Sec-Fetch-Dest": "document",
          "Sec-Fetch-Mode": "navigate",
          "Sec-Fetch-Site": "same-origin",
          "Sec-Fetch-User": "?1",
        },
        validateStatus() {
          return true;
        },
      }
    );
    if (!a.headers["set-cookie"]?.length)
      throw new Error("no cookies provided");

    const cookies: token = {
      "sound=off": {
        name: "",
        value: "",
      },
      "x-csrf-token": {
        name: "",
        value: "",
      },
      CID: {
        name: "",
        value: "",
      },
    };
    a.headers["set-cookie"].forEach((item) => {
      const cookie = this.parseCookie(item);
      if (!cookie) throw new Error("parsing cookie error");
      if (cookie.name in cookies) {
        (cookies[cookie.name] as Cookie) = cookie;
      }
    });
    this.token = cookies;
  }
}

export default Ifunny;
