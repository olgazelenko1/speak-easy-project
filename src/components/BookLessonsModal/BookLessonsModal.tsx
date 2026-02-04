import type { FC } from "react";
import { useForm, type FieldErrors } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import bookingUser from "../../firebase/booking";
import * as yup from "yup";
import Modal from "../Modal/Modal";
import css from "./BookLessonsModal.module.css";

interface Props {
  isOpen: boolean;
  teacherName?: string;
  onClose: () => void;
}
type FormData = {
  name: string;
  email: string;
  phone_number: number;
};

const schema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone_number: yup.number().required("Phone number is required"),
});

const BookLessonsModal: FC<Props> = ({ isOpen, onClose, teacherName }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await bookingUser({
        name: data.name,
        email: data.email,
        phone_number: data.phone_number,
      });
      toast.success("Booking successfully!");
      reset();
      onClose();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  const onError = (errors: FieldErrors<FormData>) => {
    Object.values(errors).forEach((error) => {
      if (error?.message) {
        toast.error(error.message);
      }
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2>Book a lesson with {teacherName}</h2>
      <div className={css.bookModal}>
        <div>
          <form onSubmit={handleSubmit(onSubmit, onError)}>
            {/* Add your form fields here */}
            <div>
              <label htmlFor="name">Name:</label>
              <input id="name" {...register("name")} type="text" />
              {errors.name && <p>{errors.name.message}</p>}
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input id="email" {...register("email")} type="email" />
              {errors.email && <p>{errors.email.message}</p>}
            </div>
            <div>
              <label htmlFor="phone_number">Phone Number:</label>
              <input
                id="phone_number"
                {...register("phone_number")}
                type="tel"
              />
              {errors.phone_number && <p>{errors.phone_number.message}</p>}
            </div>
            <button type="submit">Book Lesson</button>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default BookLessonsModal;
