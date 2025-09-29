import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast, Bounce } from "react-toastify";
import { io } from "socket.io-client";
import "../css/drbyid.css";

export const Drbyid = () => {
  const [socket, setSocket] = useState(null);
  const { Authorizationadmin, user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [patientdata,setPatientdata] = useState({
    disc:"",
    batch:"",
    submit:false,
    allocate:false,
    drid:"",
  })
  const [form, setForm] = useState({
    did:"",
    username: "",
    email: "",
    specialization: "",
    licenseProof: "",
    center: "",
    // batch: "",
    // disc: "",
    // submit: false,    // match backend default
    // allocate: false,  // match backend default
  });

  // Handle input changes for batch/disc
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatientdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  // Fetch existing doctor/patient data
  const getdata = async () => {
    try {
      const response = await fetch(`http://localhost:5000/patient/doctor/${id}`, {
        method: "GET",
        headers: {
          Authorization: Authorizationadmin,
        },
      });

      const data = await response.json();
      console.log("User data:", data);

      setForm((prev) => ({
        ...prev,
        did:data._id,
        username: data.username || "",
        email: data.email || "",
        specialization: data.specialization || "",
        licenseProof: data.licenseProof || "",
        center: data.center || "",
        // batch: data.batch || "",
        // disc: data.disc || "",
        // submit: data.submit ?? false,     // ✅ safe default
        // allocate: data.allocate ?? false,
         // ✅ safe default
      }));
    } catch (error) {
      console.log(error);
    }
  };

  // Submit patient form (just updates submit: true)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/patient/doctor/update/${user._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: Authorizationadmin,
        },
        body: JSON.stringify({
           submit: true,
           drid:form.did
        }),
      });

      const result = await response.json();
      console.log("Update result:", result);

      if (response.ok) {
        toast.success("Form submitted! Waiting for doctor approval.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        user.submit = true;
        ptdrid=form.did
         user.batch=patientdata.batch,
           user.disc=patientdata.disc
        // user.drid=form._id
        // Update frontend state immediately
        setPatientdata((prev) => ({ ...prev, submit:true }));
        // navigate(-1)
       const username=user.username
                                          const email=user.email
                                          const fullname=user.fullname
                                          const phone=user.phone1
                                          const submit=user.submit
                                          const batch=user.batch
                                          const blood=user.blood
                                          const disc=user.disc
                                          const allocate=false
        socket.emit("sendToCenter", { ptdrid, username,
                                          email,
                                          fullname,
                                          phone,
                                          submit,
                                          batch,
                                          blood,
                                          disc,
                                          allocate,
         });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getdata();
     const newSocket = io("http://localhost:5000");
        setSocket(newSocket);
        return () => newSocket.disconnect();
  }, []);

  // Show message if already submitted
  if (user.submit === true || patientdata.submit=== true) {
    return (
      <div className="submitted-message">
        <h1>You submitted your form. Wait for doctor approval.</h1>
        {form.allocate && <p>✅ Approved by doctor!</p>}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="patient-form">
      {/* Doctor Section */}
      <div className="form-section">
        <h2>Doctor Information</h2>
        <div className="form-group">
          <label>Doctor Name</label>
          <input type="text" value={form.username} readOnly />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" value={form.email} readOnly />
        </div>
        <div className="form-group">
          <label>Center</label>
          <input type="text" value={form.center} readOnly />
        </div>
        <div className="form-group">
          <label>Specialization</label>
          <input type="text" value={form.specialization} readOnly />
        </div>
        <div className="form-group">
          <label>License Proof</label>
          <input type="text" value={form.licenseProof} readOnly />
        </div>
      </div>

      {/* Patient Section */}
      <div className="form-section">
        <h2>Patient Information</h2>
        <div className="form-group">
          <label>Patient Name</label>
          <input type="text" value={user?.fullname || ""} readOnly />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" value={user?.email || ""} readOnly />
        </div>
        <div className="form-group">
          <label>Age</label>
          <input type="number" value={user?.age || ""} readOnly />
        </div>
        <div className="form-group">
          <label>Blood Group</label>
          <input type="text" value={user?.blood || ""} readOnly />
        </div>
        <div className="form-group">
          <label>Gender</label>
          <input type="text" value={user?.gender || ""} readOnly />
        </div>
      </div>

      {/* Patient Submission */}
      <div className="form-section">
        <h2>Patient Submission</h2>
        <div className="form-group">
          <label>Batch</label>
          <select
            name="batch"
            value={patientdata.batch}
            onChange={handleChange}
            required
          >
            <option value="">Select Batch</option>
            <option value="Morning">Morning</option>
            <option value="Afternoon">Afternoon</option>
            <option value="Evening">Evening</option>
          </select>
        </div>
        <div className="form-group">
          <label>Discussion / Notes</label>
          <textarea
            name="disc"
            value={patientdata.disc}
            onChange={handleChange}
            placeholder="Write your notes..."
            required
          />
        </div>
      </div>

      <div className="form-actions">
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};