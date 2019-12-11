import {
  validate,
  validateOrReject,
  Contains,
  IsInt,
  Length,
  IsEmail,
  IsFQDN,
  IsDate,
  Min,
  Max,
  IsBoolean
} from 'class-validator'

class Course {
  @Length(10, 20)
  name: string

  @Length(10, 20)
  author: string

  @IsBoolean()
  isPublished: boolean

  constructor(name: string, author: string, isPublished: boolean) {
    ;(this.name = name),
      (this.author = author),
      (this.isPublished = isPublished)
  }
}

const myCourse = new Course('course 1 course 1', 'author 1', false)

async function validateCourse(course: Course) {
  try {
    await validateOrReject(course)
  } catch (e) {
    console.error(e)
    console.log(Array.isArray(e))
  }
}

validateCourse(myCourse)
