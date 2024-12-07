"use client";
import React, { useState } from "react";
import { Row, Col, Layout, Spin, Alert, Input, Button } from "antd";
import { useFetchData } from "@/hooks/useFetchData";
import styles from "./page.module.css";

const { Header, Content } = Layout;

const ResponsiveGridComponent: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [query, setQuery] = useState<string>("");

  // Fetch data with the current query as a search parameter
  const { data, isLoading, isError, error } = useFetchData<
    { id: number; name: string }[]
  >({
    queryKey: ["products", query],
    apiEndpoint: query
      ? `/products?limit=6&search=${query}`
      : `/products?limit=6`,
  });

  const handleSearch = () => {
    setQuery(searchTerm);
  };

  const handleClear = () => {
    setSearchTerm("");
    setQuery("");
  };

  if (isLoading) {
    return (
      <div className={styles.loader}>
        <Spin size="large" />
      </div>
    );
  }

  const tiles = [
    { height: 300, color: "#8fa9dc" },
    { height: 500, color: "#f7cbac" },
    { height: 200, color: "#dbdbda" },
    { height: 300, color: "#bed5ef" },
    { height: 500, color: "#c5dfb4" },
    { height: 250, color: "#fef1cb" },
  ];

  return (
    <Layout>
      <Header className={styles.header}>Responsive Grid Layout</Header>
      <Content className={styles.container}>
        <Row gutter={[8, 8]} justify="center" className={styles.searchBar}>
          <Col xs={24} sm={16} md={12} lg={8}>
            <Input
              placeholder="Search products"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onPressEnter={handleSearch}
              style={{ width: "100%" }}
            />
          </Col>
          <Col xs="auto">
            <Button type="primary" onClick={handleSearch}>
              Search
            </Button>
          </Col>
          <Col xs="auto">
            <Button onClick={handleClear}>Clear</Button>
          </Col>
        </Row>
        {isError ? (
          <Row gutter={[16, 16]} justify="center">
            <Alert message={error} description={error} type="error" />
          </Row>
        ) : (
          <Row gutter={[16, 16]} justify="center">
            {data?.map((item, index) => {
              const tile = tiles[index % tiles.length];
              return (
                <Col key={item.id} xs={24} sm={24} md={12} lg={8}>
                  <div
                    className={styles.tile}
                    style={{
                      height: tile.height,
                      backgroundColor: tile.color,
                    }}
                  >
                    {item.name} ({tile.height}px)
                  </div>
                </Col>
              );
            })}
          </Row>
        )}
      </Content>
    </Layout>
  );
};

export default ResponsiveGridComponent;
