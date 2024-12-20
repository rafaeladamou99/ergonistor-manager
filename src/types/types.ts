import { FileType } from "../components/FileUpload/FileUpload"

export interface onChangeType<T> {
  name: string
  value: T
}

export interface IContent {
  home: {
    title: string
    msg: string
  }
  services: {
    title: string
    msg: string
    subtitle: string
  }
  projects: {
    title: string
    msg: string
    subtitle: string
  }
  about: {
    title: string
    msg: string
    sections: {
      title: string
      paragraphs: string[]
    }[]
    key_people: {
      name: string
      position: string
      img: string
    }[]
  }
  faq: {
    title: string
    msg: string
    questions: {
      title: string
      paragraphs: string[]
    }[]
  }
  contact: {
    title: string
    msg: string
    telephone: ContactMedium
    email: ContactMedium
  }
}

export interface ContactMedium {
  value: string
  msg: string
}

export interface ContentProp {
  content?: IContent
}

export interface ContentPayload {
  content_title: string
  is_primary: boolean
  content: IContent
}

export interface ContentResponse extends ContentPayload {
  _id: string
}

export interface ServiceProjectPayload {
  title: string
  paragraphs: string[]
  img1: undefined | FileType | string
  img2: undefined | FileType | string
  img3: undefined | FileType | string
  img4: undefined | FileType | string
  img5: undefined | FileType | string
  category?: string
  architect?: string
  status?: string
}

export interface ServiceCategoryPayload {
  title: string
  description: string
  img: undefined | FileType | string
}

export interface ServiceCategory extends ServiceCategoryPayload {
  _id: string
}
export interface ServiceProject extends ServiceProjectPayload {
  _id: string
}

export interface Project {
  title: string
  paragraphs: string[]
  img: string
}

export interface Slider {
  msg: string
  imgs: string[]
  logo: string
  _id: string
}

export interface SliderPayload {
  imgs: (FileType | string)[]
  msg: string
  logo: FileType | string
}
