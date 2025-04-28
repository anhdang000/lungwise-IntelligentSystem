
import React, { useState, useEffect } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import PatientList from "../components/PatientList";
import PatientDashboard from "../components/PatientDashboard";
import { getPatientById } from "../data/patients";

const PatientDetail = () => {
  const { id } = useParams<{ id: string }>();
  const patient = id ? getPatientById(id) : undefined;
  
  return <PatientDashboard patient={patient!} />;
};

const Index = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<PatientList />} />
        <Route path="/patients/:id" element={<PatientDetail />} />
      </Routes>
    </Layout>
  );
};

export default Index;
