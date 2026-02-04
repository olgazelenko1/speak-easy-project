import type { FC } from "react";
import { useState } from "react";
import { useForm, type FieldErrors, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import bookingUser from "../../firebase/booking";
import * as yup from "yup";
import Modal from "../Modal/Modal";
import css from "./BookModal.module.css";

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
    formState: { errors },
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

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={css.bookModal}>
        <h2>Book trial lesson</h2>
        <p>
          Our experienced tutor will assess your current language level, discuss
          your learning goals, and tailor the lesson to your specific needs.
        </p>
        <div className={css.details}>
          <img
            src={avatar_url}
            alt={`${name} ${surname}`}
            className={css.avatar}
          />
          <h3>
            {name} {surname}
          </h3>
        </div>

        <div>
          <form onSubmit={handleSubmit(onSubmit, onError)}>
            <h3>What is your main reason for learning English?</h3>

            <div className={css.radioGroup}>
              <label>
                <input
                  type="radio"
                  value="Career and business"
                  {...register("reason", {
                    required: "Please select a reason",
                  })}
                />
                Career and business
              </label>

              <label>
                <input
                  type="radio"
                  value="Lesson for kids"
                  {...register("reason", {
                    required: "Please select a reason",
                  })}
                />
                Lesson for kids
              </label>

              <label>
                <input
                  type="radio"
                  value="Living abroad"
                  {...register("reason", {
                    required: "Please select a reason",
                  })}
                />
                Living abroad
              </label>

              <label>
                <input
                  type="radio"
                  value="Exams and coursework"
                  {...register("reason", {
                    required: "Please select a reason",
                  })}
                />
                Exams and coursework
              </label>

              <label>
                <input
                  type="radio"
                  value="Culture, travel or hobby"
                  {...register("reason", {
                    required: "Please select a reason",
                  })}
                />
                Culture, travel or hobby
              </label>

              {errors.reason && (
                <p className={css.error}>{errors.reason.message}</p>
              )}
            </div>

            {/* Інші поля форми */}
            <div className={css.formGroup}>
              <input
                id="name"
                {...register("name")}
                type="text"
                placeholder="Name"
              />
              {errors.name && <p>{errors.name.message}</p>}
            </div>
            <div className={css.formGroup}>
              <input
                id="email"
                {...register("email")}
                type="email"
                placeholder="Email"
              />
              {errors.email && <p>{errors.email.message}</p>}
            </div>
            <div className={css.formGroup}>
              <input
                id="phone_number"
                {...register("phone_number")}
                type="tel"
                placeholder="Phone number"
              />
              {errors.phone_number && <p>{errors.phone_number.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={css.submitButton}
            >
              {isSubmitting ? "Booking..." : "Book Lesson"}
            </button>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default BookLessonsModal;
