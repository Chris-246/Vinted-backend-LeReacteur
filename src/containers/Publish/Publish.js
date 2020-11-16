import React, { useState } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { useHistory } from "react-router-dom";

const Publish = ({ token }) => {
  const history = useHistory();
  //création des states de réception des infos rentrées par le user
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [price, setPrice] = useState("");
  // const [file, setFile] = useState();

  // fonctions utilisées pour le dropzone
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  const file = acceptedFiles[0];

  //création de l'objet de type formData pour inclure la photo
  const formData = new FormData();
  //puis on ajoute les éléments nécessaires pour envoi de requête axios
  formData.append("title", title);
  formData.append("description", description);
  formData.append("condition", condition);
  formData.append("city", city);
  formData.append("brand", brand);
  formData.append("size", size);
  formData.append("color", color);
  formData.append("price", price);
  formData.append("picture", file);

  // console.log(formData.get("picture"));

  //création de la fonction qui servira de handleSubmit pour la requête
  const handleSubmit = async (event) => {
    event.preventDefault();

    //requête axios avec trois argument : url api + formData pour envoyer photo dans le bon format + bearer token
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      history.push("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="publishPage">
      <form className="publishForm" onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          placeholder="Titre"
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
        <textarea
          value={description}
          cols="30"
          rows="3"
          placeholder="Description"
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        />
        <input
          type="text"
          value={price}
          placeholder="Prix"
          onChange={(event) => {
            const value = Number(event.target.value);
            if (value) {
              setPrice(value);
            } else {
              alert("Le prix doit être écrit en chiffres!");
            }
          }}
        />
        <input
          type="text"
          value={condition}
          placeholder="Condition"
          onChange={(event) => {
            setCondition(event.target.value);
          }}
        />
        <input
          type="text"
          value={city}
          placeholder="Ville"
          onChange={(event) => {
            setCity(event.target.value);
          }}
        />
        <input
          type="text"
          value={brand}
          placeholder="Marque"
          onChange={(event) => {
            setBrand(event.target.value);
          }}
        />
        <input
          type="text"
          value={size}
          placeholder="Taille"
          onChange={(event) => {
            const value = Number(event.target.value);
            if (value) {
              setSize(value);
            } else {
              alert("Le prix doit être écrit en chiffres!");
            }
          }}
        />
        <input
          type="text"
          value={color}
          placeholder="Couleur"
          onChange={(event) => {
            setColor(event.target.value);
          }}
        />

        <section className="dropzoneWrapper">
          <div {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} />
            <p>Glisser/déposer le fichier ou cliquez ici</p>
          </div>
          {file ? <p>{file.path}</p> : null}
        </section>

        <button type="submit">Poster l'offre</button>
      </form>
    </div>
  );
};

export default Publish;

/* <input
          type="file"
          value={file}
          className="fileInput"
          onChange={(event) => {
            setFile(event.target.files[0]);
          }}
        /> */
