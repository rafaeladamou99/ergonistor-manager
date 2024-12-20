import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { FormControlLabel, Switch } from "@mui/material"
import Button from "../../../components/Button/Button"
import TextField from "../../../components/TextField/TextField"
import useContent from "./useContent"

const Content = () => {
  const {
    onSubmit,
    onChangeString,
    addFaqQuestion,
    addFaqQuestionParagraph,
    addPerson,
    addSection,
    addSectionParagraph,
    hasTypePeople,
    hasTypeSections,
    removeFaqQuestion,
    removeFaqQuestionParagraph,
    removeParagraph,
    removePerson,
    removeSection,
    onIsPrimaryChange,
    isEdit,
    formik,
    formId
  } = useContent()

  return (
    <div className="w-full h-full flex items-center justify-center md:p-10">
      <form
        className="w-full md:rounded-3xl bg-gray-100 p-6 flex flex-col gap-6 items-center"
        onSubmit={onSubmit}
        key={formId}
      >
        {isEdit && (
          <span className="text-4xl">{formik.values.content_title}</span>
        )}
        <div
          className="flex flex-col gap-4 w-full md:w-10/12 md:max-w-[1200px]"
          key="home"
        >
          {!isEdit && (
            <TextField
              name="content_title"
              onChange={onChangeString}
              label="Title"
              hasError={
                !!formik.errors.content_title && formik.touched.content_title
              }
              errorMsg={formik.errors.content_title}
              value={formik.values.content_title}
            />
          )}
          <span className="text-2xl">Home</span>
          <TextField
            name="content.home.title"
            onChange={onChangeString}
            label="Title"
            hasError={
              !!formik.errors.content?.home?.title &&
              formik.touched.content?.home?.title
            }
            errorMsg={formik.errors.content?.home?.title}
            value={formik.values.content.home.title}
          />
          <TextField
            name="content.home.msg"
            onChange={onChangeString}
            label="Message"
            hasError={
              !!formik.errors.content?.home?.msg &&
              formik.touched.content?.home?.msg
            }
            errorMsg={formik.errors.content?.home?.msg}
            value={formik.values.content.home.msg}
          />
        </div>
        <div
          className="flex flex-col gap-4 w-full md:w-10/12 md:max-w-[1200px]"
          key="about"
        >
          <span className="text-2xl">About</span>
          <TextField
            name="content.about.title"
            onChange={onChangeString}
            label="Title"
            hasError={
              !!formik.errors.content?.about?.title &&
              formik.touched.content?.about?.title
            }
            errorMsg={formik.errors.content?.about?.title}
            value={formik.values.content.about.title}
          />
          <TextField
            name="content.about.msg"
            onChange={onChangeString}
            label="Message"
            hasError={
              !!formik.errors.content?.about?.msg &&
              formik.touched.content?.about?.msg
            }
            errorMsg={formik.errors.content?.about?.msg}
            value={formik.values.content.about.msg}
          />
          <div className="flex flex-col gap-3 w-full md:w-10/12">
            <span className="text-xl">Sections</span>
            {formik.values.content.about.sections.map((section, index) => (
              <div
                key={`section-${index}`}
                className="flex flex-col gap-2 w-full md:w-10/12"
              >
                <div className="flex gap-2 items-center">
                  <span className="text-lg">Section {index + 1}</span>
                  <FontAwesomeIcon
                    icon={faTrash}
                    onClick={removeSection(index)}
                    className="cursor-pointer hover:text-red-700"
                  />
                </div>
                <TextField
                  name={`content.about.sections[${index}].title`}
                  onChange={onChangeString}
                  label="Title"
                  hasError={
                    hasTypeSections(formik.errors.content?.about?.sections) &&
                    !!formik.errors.content?.about?.sections?.[index]?.title &&
                    formik.touched.content?.about?.sections?.[index]?.title
                  }
                  errorMsg={
                    (hasTypeSections(formik.errors.content?.about?.sections) &&
                      formik.errors.content?.about?.sections?.[index]?.title) ||
                    undefined
                  }
                  value={section.title}
                />
                {section.paragraphs.map((paragraph, pIndex) => (
                  <div className="flex gap-2 items-center">
                    <TextField
                      name={`content.about.sections[${index}].paragraphs[${pIndex}]`}
                      onChange={onChangeString}
                      label={`Paragraph ${pIndex + 1}`}
                      hasError={
                        hasTypeSections(
                          formik.errors.content?.about?.sections
                        ) &&
                        !!formik.errors.content?.about?.sections?.[index]
                          ?.paragraphs?.[pIndex] &&
                        formik.touched.content?.about?.sections?.[index]
                          ?.paragraphs
                      }
                      errorMsg={
                        (hasTypeSections(
                          formik.errors.content?.about?.sections
                        ) &&
                          formik.errors.content?.about?.sections?.[index]
                            ?.paragraphs?.[pIndex]) ||
                        undefined
                      }
                      value={paragraph}
                    />
                    <FontAwesomeIcon
                      icon={faTrash}
                      onClick={removeParagraph(index, pIndex)}
                      className="cursor-pointer hover:text-red-700"
                    />
                  </div>
                ))}
                <Button
                  label="Add Section Paragraph"
                  onClick={addSectionParagraph(index)}
                />
              </div>
            ))}
            <Button label="Add Section" onClick={addSection} />
          </div>

          <div className="flex flex-col gap-3 w-full md:w-10/12">
            <span className="text-xl">People</span>
            {formik.values.content.about.key_people.map((person, index) => (
              <div
                key={`person-${index}`}
                className="flex flex-col gap-2 w-full md:w-10/12"
              >
                <div className="flex gap-2 items-center">
                  <span className="text-lg">Person {index + 1}</span>
                  <FontAwesomeIcon
                    icon={faTrash}
                    onClick={removePerson(index)}
                    className="cursor-pointer hover:text-red-700"
                  />
                </div>
                <TextField
                  name={`content.about.key_people[${index}].name`}
                  onChange={onChangeString}
                  label="Title"
                  hasError={
                    hasTypePeople(formik.errors.content?.about?.key_people) &&
                    !!formik.errors.content?.about?.key_people?.[index]?.name &&
                    formik.touched.content?.about?.key_people?.[index]?.name
                  }
                  errorMsg={
                    (hasTypePeople(formik.errors.content?.about?.key_people) &&
                      formik.errors.content?.about?.key_people?.[index]
                        ?.name) ||
                    undefined
                  }
                  value={person.name}
                />
                <TextField
                  name={`content.about.key_people[${index}].position`}
                  onChange={onChangeString}
                  label="Position"
                  hasError={
                    hasTypePeople(formik.errors.content?.about?.key_people) &&
                    !!formik.errors.content?.about?.key_people?.[index]
                      ?.position &&
                    formik.touched.content?.about?.key_people?.[index]?.position
                  }
                  errorMsg={
                    (hasTypePeople(formik.errors.content?.about?.key_people) &&
                      formik.errors.content?.about?.key_people?.[index]
                        ?.position) ||
                    undefined
                  }
                  value={person.position}
                />
                <TextField
                  name={`content.about.key_people[${index}].img`}
                  onChange={onChangeString}
                  label="Image"
                  hasError={
                    hasTypePeople(formik.errors.content?.about?.key_people) &&
                    !!formik.errors.content?.about?.key_people?.[index]?.img &&
                    formik.touched.content?.about?.key_people?.[index]?.img
                  }
                  errorMsg={
                    (hasTypePeople(formik.errors.content?.about?.key_people) &&
                      formik.errors.content?.about?.key_people?.[index]?.img) ||
                    undefined
                  }
                  value={person.img}
                />
              </div>
            ))}
            <Button label="Add Person" onClick={addPerson} />
          </div>
        </div>
        <div
          className="flex flex-col gap-4 w-full md:w-10/12 md:max-w-[1200px]"
          key="contact"
        >
          <span className="text-2xl">Contact</span>
          <TextField
            name="content.contact.title"
            onChange={onChangeString}
            label="Title"
            hasError={
              !!formik.errors.content?.contact?.title &&
              formik.touched.content?.contact?.title
            }
            errorMsg={formik.errors.content?.contact?.title}
            value={formik.values.content.contact.title}
          />
          <TextField
            name="content.contact.msg"
            onChange={onChangeString}
            label="Message"
            hasError={
              !!formik.errors.content?.contact?.msg &&
              formik.touched.content?.contact?.msg
            }
            errorMsg={formik.errors.content?.contact?.msg}
            value={formik.values.content.contact.msg}
          />
          <div className="flex flex-col gap-3 w-full md:w-10/12">
            <div className="flex flex-col gap-2 w-full md:w-10/12">
              <span className="text-xl">Email</span>
              <TextField
                name="content.contact.email.value"
                onChange={onChangeString}
                label="Email Address"
                hasError={
                  !!formik.errors.content?.contact?.email?.value &&
                  formik.touched.content?.contact?.email?.value
                }
                errorMsg={formik.errors.content?.contact?.email?.value}
                value={formik.values.content.contact.email?.value}
              />
              <TextField
                name="content.contact.email.msg"
                onChange={onChangeString}
                label="Email Message"
                hasError={
                  !!formik.errors.content?.contact?.email?.msg &&
                  formik.touched.content?.contact?.email?.msg
                }
                errorMsg={formik.errors.content?.contact?.email?.msg}
                value={formik.values.content.contact.email?.msg}
              />
            </div>
            <div className="flex flex-col gap-2 w-full md:w-10/12">
              <span className="text-xl">Telephone</span>
              <TextField
                name="content.contact.telephone.value"
                onChange={onChangeString}
                label="Telephone"
                hasError={
                  !!formik.errors.content?.contact?.telephone?.value &&
                  formik.touched.content?.contact?.telephone?.value
                }
                errorMsg={formik.errors.content?.contact?.telephone?.value}
                value={formik.values.content.contact.telephone?.value}
              />
              <TextField
                name="content.contact.telephone.msg"
                onChange={onChangeString}
                label="Telephone Message"
                hasError={
                  !!formik.errors.content?.contact?.telephone?.msg &&
                  formik.touched.content?.contact?.telephone?.msg
                }
                errorMsg={formik.errors.content?.contact?.telephone?.msg}
                value={formik.values.content.contact.telephone?.msg}
              />
            </div>
          </div>
        </div>

        <div
          className="flex flex-col gap-4 w-full md:w-10/12 md:max-w-[1200px]"
          key="faq"
        >
          <span className="text-2xl">FAQ</span>
          <TextField
            name="content.faq.title"
            onChange={onChangeString}
            label="Title"
            hasError={
              !!formik.errors.content?.faq?.title &&
              formik.touched.content?.faq?.title
            }
            errorMsg={formik.errors.content?.faq?.title}
            value={formik.values.content.faq.title}
          />
          <TextField
            name="content.faq.msg"
            onChange={onChangeString}
            label="Message"
            hasError={
              !!formik.errors.content?.faq?.msg &&
              formik.touched.content?.faq?.msg
            }
            errorMsg={formik.errors.content?.faq?.msg}
            value={formik.values.content.faq.msg}
          />
          <div className="flex flex-col gap-3 w-full md:w-10/12">
            {formik.values.content.faq.questions.map((question, index) => (
              <div
                key={`question-${index}`}
                className="flex flex-col gap-2 w-full md:w-10/12"
              >
                <div className="flex gap-2 items-center">
                  <span className="text-xl">Question {index + 1}</span>
                  <FontAwesomeIcon
                    icon={faTrash}
                    onClick={removeFaqQuestion(index)}
                    className="cursor-pointer hover:text-red-700"
                  />
                </div>
                <TextField
                  name={`content.faq.questions[${index}].title`}
                  onChange={onChangeString}
                  label="Title"
                  hasError={
                    hasTypeSections(formik.errors.content?.faq?.questions) &&
                    !!formik.errors.content?.faq?.questions?.[index]?.title &&
                    formik.touched.content?.faq?.questions?.[index]?.title
                  }
                  errorMsg={
                    (hasTypeSections(formik.errors.content?.faq?.questions) &&
                      formik.errors.content?.faq?.questions?.[index]?.title) ||
                    undefined
                  }
                  value={question.title}
                />
                {question.paragraphs.map((paragraph, pIndex) => (
                  <div className="flex gap-2 items-center">
                    <TextField
                      name={`content.faq.questions[${index}].paragraphs[${pIndex}]`}
                      onChange={onChangeString}
                      label={`Paragraph ${pIndex + 1}`}
                      hasError={
                        hasTypeSections(
                          formik.errors.content?.faq?.questions
                        ) &&
                        !!formik.errors.content?.faq?.questions?.[index]
                          ?.paragraphs?.[pIndex] &&
                        formik.touched.content?.faq?.questions?.[index]
                          ?.paragraphs
                      }
                      errorMsg={
                        (hasTypeSections(
                          formik.errors.content?.faq?.questions
                        ) &&
                          formik.errors.content?.faq?.questions?.[index]
                            ?.paragraphs?.[pIndex]) ||
                        undefined
                      }
                      value={paragraph}
                    />
                    <FontAwesomeIcon
                      icon={faTrash}
                      onClick={removeFaqQuestionParagraph(index, pIndex)}
                      className="cursor-pointer hover:text-red-700"
                    />
                  </div>
                ))}
                <Button
                  label="Add FAQ Question Paragraph"
                  onClick={addFaqQuestionParagraph(index)}
                />
              </div>
            ))}
            <Button label="Add FAQ Questions" onClick={addFaqQuestion} />
          </div>
        </div>

        <div
          className="flex flex-col gap-4 w-full md:w-10/12 md:max-w-[1200px]"
          key="projects"
        >
          <span className="text-2xl">Projects</span>
          <TextField
            name="content.projects.title"
            onChange={onChangeString}
            label="Title"
            hasError={
              !!formik.errors.content?.projects?.title &&
              formik.touched.content?.projects?.title
            }
            errorMsg={formik.errors.content?.projects?.title}
            value={formik.values.content.projects.title}
          />
          <TextField
            name="content.projects.subtitle"
            onChange={onChangeString}
            label="Subtitle"
            hasError={
              !!formik.errors.content?.projects?.subtitle &&
              formik.touched.content?.projects?.subtitle
            }
            errorMsg={formik.errors.content?.projects?.subtitle}
            value={formik.values.content.projects.subtitle}
          />
          <TextField
            name="content.projects.msg"
            onChange={onChangeString}
            label="Message"
            hasError={
              !!formik.errors.content?.projects?.msg &&
              formik.touched.content?.projects?.msg
            }
            errorMsg={formik.errors.content?.projects?.msg}
            value={formik.values.content.projects.msg}
          />
        </div>

        <div
          className="flex flex-col gap-4 w-full md:w-10/12 md:max-w-[1200px]"
          key="services"
        >
          <span className="text-2xl">Services</span>
          <TextField
            name="content.services.title"
            onChange={onChangeString}
            label="Title"
            hasError={
              !!formik.errors.content?.services?.title &&
              formik.touched.content?.services?.title
            }
            errorMsg={formik.errors.content?.services?.title}
            value={formik.values.content.services.title}
          />
          <TextField
            name="content.services.subtitle"
            onChange={onChangeString}
            label="Subtitle"
            hasError={
              !!formik.errors.content?.services?.subtitle &&
              formik.touched.content?.services?.subtitle
            }
            errorMsg={formik.errors.content?.services?.subtitle}
            value={formik.values.content.services.subtitle}
          />
          <TextField
            name="content.services.msg"
            onChange={onChangeString}
            label="Message"
            hasError={
              !!formik.errors.content?.services?.msg &&
              formik.touched.content?.services?.msg
            }
            errorMsg={formik.errors.content?.services?.msg}
            value={formik.values.content.services.msg}
          />
        </div>
        <FormControlLabel
          control={
            <Switch
              checked={formik.values.is_primary}
              onChange={onIsPrimaryChange}
            />
          }
          label="Primary Content"
        />
        <Button label="Save" isSubmit />
      </form>
    </div>
  )
}

export default Content
