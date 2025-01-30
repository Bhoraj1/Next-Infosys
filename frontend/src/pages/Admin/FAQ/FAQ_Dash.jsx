import { Button, Modal, Table } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useFaqs } from "../../../store/ContextAPI";



export default function FAQ_Dash() {
  const { faqs } = useFaqs();
  const { adminDetails } = useSelector((state) => state.admin);
  const [showModal, setShowModal] = useState(false);

  const handleDeleteFAQ = async () => {};
  return (
    <div className="table-auto mt-4 overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500  ">
      {adminDetails?.isAdmin && faqs.length > 0 ? (
        <Table hoverable className="shadow-md">
          <Table.Head>
            <Table.HeadCell>Post Date</Table.HeadCell>
            <Table.HeadCell>Question</Table.HeadCell>
            <Table.HeadCell>Answer</Table.HeadCell>
            <Table.HeadCell>Delete</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {faqs.map((faq) => (
              <Table.Row
                key={faq._id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800 "
              >
                <Table.Cell>
                  {new Date(faq.createdAt).toDateString()}
                </Table.Cell>
                <Table.Cell>{faq.question}</Table.Cell>
                <Table.Cell>{faq.answer}</Table.Cell>

                <Table.Cell>
                  <span
                    onClick={() => {
                      setShowModal(true);
                      // setUserIdToDelete(faq._id);
                    }}
                    className="font-medium text-red-600 hover:underline cursor-pointer"
                  >
                    Delete
                  </span>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      ) : (
        <p>There are no FAQs yet!</p>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this user ?{" "}
            </h3>
            <div className="flex justify-center gap-7">
              <Button color="failure" onClick={handleDeleteFAQ}>
                Yes, I am sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
