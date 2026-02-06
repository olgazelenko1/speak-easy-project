import type { FC } from "react";
import { useState } from "react";
import { useForm, type FieldErrors, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import bookingUser from "../../firebase/booking";
import * as yup from "yup";
import Modal from "../Modal/Modal";
import css from "./BookModal.module.css";
import { Button } from "../Ui/Button/Button";

interface TeacherPreview {
  name: string;
  surname: string;
  avatar_url: string;
}

interface Props {
  isOpen: boolean;
  teacher: TeacherPreview;
  onClose: () => void;
}

type FormData = {
  name: string;
  email: string;
  phone_number: string;
  reason?: string;
};

const schema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone_number: yup
    .string()
    .required("Phone number is required")
    .matches(/^\+?[0-9\s\-()]*$/, "Invalid phone number"),
});

const BookLessonsModal: FC<Props> = ({ isOpen, onClose, teacher }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phone_number: "",
      reason: "",
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsSubmitting(true);
    if (!data.reason) {
      toast.error("Please select a reason for learning English");
      setIsSubmitting(false);
      return;
    }

    try {
      await bookingUser({
        ...data,
        teacher,
        reason: data.reason,
      });

      toast.success("Booking successfully!");
      reset();
      onClose();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "An unexpected error occurred",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const onError = (errors: FieldErrors<FormData>) => {
    Object.values(errors).forEach((error) => {
      if (error?.message) toast.error(error.message);
    });
  };

  const { avatar_url, name, surname } = teacher;
  const reasons = [
    "Career and business",
    "Lesson for kids",
    "Living abroad",
    "Exams and coursework",
    "Culture, travel or hobby",
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={css.bookModal}>
        <h2 className={css.bookModalTitle}>Book trial lesson</h2>
        <p className={css.description}>
          Our experienced tutor will assess your current language level, discuss
          your learning goals, and tailor the lesson to your specific needs.
        </p>

        <div className={css.details}>
          <img
            src={avatar_url}
            alt={`${name} ${surname}`}
            className={css.avatar}
          />
          <div className={css.detailsText}>
            <p className={css.subtitle}>Your teacher</p>
            <h3 className={css.teacherName}>
              {name} {surname}
            </h3>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <h3 className={css.formTitle}>
            What is your main reason for learning English?
          </h3>

          <div className={css.radioGroup}>
            {reasons.map((reason) => (
              <label key={reason} className={css.radioLabel}>
                <input
                  type="radio"
                  value={reason}
                  {...register("reason", {
                    required: "Please select a reason",
                  })}
                />
                {reason}
              </label>
            ))}
          </div>

          <div className={css.formGroup}>
            <input
              className={css.input}
              id="name"
              {...register("name")}
              type="text"
              placeholder="Name"
              aria-label="Enter your name"
            />

            <input
              className={css.input}
              id="email"
              {...register("email")}
              type="email"
              placeholder="Email"
            />

            <input
              className={css.input}
              id="phone_number"
              {...register("phone_number")}
              type="tel"
              placeholder="Phone number"
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className={css.submitButton}
          >
            {isSubmitting ? (
              <>
                <span className={css.spinner}></span> Booking...
              </>
            ) : (
              "Book"
            )}
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default BookLessonsModal;
