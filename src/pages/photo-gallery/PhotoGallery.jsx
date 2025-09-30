import React, { useState } from "react";
import Container from "../../components/shared/Container";
import Table from "../../components/shared/Table";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import AddPhotoModal from "./AddPhotoModal";
import EditPhotoModal from "./EditPhotoModal";
import DeletePhotoModal from "./DeletePhotoModal";

const PhotoGallery = () => {
  const [photos, setPhotos] = useState([
    {
      id: 1,
      image: "/images/home/hero.png",
      status: "مفعل",
    },
    {
      id: 2,
      image: "/images/home/media-center.png",
      status: "غير مفعل",
    },
  ]);

  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const columns = [
    { label: "الصورة", key: "image" },
    { label: "الحالة", key: "status" },
    { label: "التحكم", key: "actions" },
  ];

  const dataWithActions = photos.map((photo) => ({
    ...photo,
    image: (
      <img
        src={photo.image}
        alt="صورة"
        className="w-[25%] mx-auto h-24 object-cover rounded"
      />
    ),
    actions: (
      <div className="flex gap-2 justify-center">
        <button
          onClick={() => {
            setSelectedPhoto(photo);
            setEditModalOpen(true);
          }}
          className="bg-[#0dcaf0] text-white rounded-sm w-[30px] h-[30px] flex items-center justify-center"
        >
          <FaEdit size={16} />
        </button>
        <button
          onClick={() => {
            setSelectedPhoto(photo);
            setDeleteModalOpen(true);
          }}
          className="bg-red-500 text-white rounded-sm w-[30px] h-[30px] flex items-center justify-center"
        >
          <FaTrashAlt size={14} />
        </button>
      </div>
    ),
  }));

  const handleAddPhoto = (newPhoto) => {
    const id = photos.length ? photos[photos.length - 1].id + 1 : 1;
    setPhotos([...photos, { id, ...newPhoto }]);
  };

  const handleUpdatePhoto = (updated) => {
    setPhotos((prev) =>
      prev.map((p) => (p.id === updated.id ? updated : p))
    );
  };

  const handleDeletePhoto = (id) => {
    setPhotos((prev) => prev.filter((p) => p.id !== id));
    setSelectedPhoto(null);
  };

  return (
    <Container>
      <div className="p-4 min-h-screen my-10">
        <div className="flex items-center justify-between w-full">
          <h2 className="text-xl font-bold mb-4">معرض الصور</h2>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-[#2ba670] px-3 h-[35px] text-white rounded-md"
          >
            أضف صورة +
          </button>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-lg">
          <Table columns={columns} data={dataWithActions} />
        </div>

        {/* المودالات */}
        <AddPhotoModal
          isOpen={isAddModalOpen}
          onClose={() => setAddModalOpen(false)}
          onAdd={handleAddPhoto}
        />
        <EditPhotoModal
          isOpen={isEditModalOpen}
          onClose={() => setEditModalOpen(false)}
          photo={selectedPhoto}
          onUpdate={handleUpdatePhoto}
        />
        <DeletePhotoModal
          isOpen={isDeleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          photo={selectedPhoto}
          onDelete={handleDeletePhoto}
        />
      </div>
    </Container>
  );
};

export default PhotoGallery;
