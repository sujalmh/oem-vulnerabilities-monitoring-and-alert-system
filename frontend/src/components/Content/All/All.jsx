import React from "react";
import { Table } from "@radix-ui/themes";
import { Text } from "@radix-ui/themes";
import { Link } from "react-router-dom";

const All = ({ data, sortValue }) => {
  // Sorting function
  const getSortedData = () => {
    if (!sortValue || !Array.isArray(data)) return data;

    return [...data].sort((a, b) => {
      if (sortValue === "severity") {
        return a.severity_level.localeCompare(b.severity_level);
      } else if (sortValue === "vendor") {
        return a.vendor.localeCompare(b.vendor);
      } else if (sortValue === "publishedDate") {
        return new Date(a.published_date) - new Date(b.published_date);
      } else if (sortValue === "name") {
        return a.product_name_version.localeCompare(b.product_name_version);
      }
      return 0;
    });
  };

  const sortedData = getSortedData();

  return (
    <Table.Root>
      {/* Table header */}
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Product and Version</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Vulnerability</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Published Date</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Vendor</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Severity Level</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Reference</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      {/* Table body */}
      <Table.Body>
        {sortedData.map((item, index) => (
          <Table.Row key={index}>
            <Table.Cell>
              <Text size={"1"}>{item.product_name_version}</Text>
            </Table.Cell>
            <Table.Cell>
              <Text size={"1"}>{item.vulnerability}</Text>
            </Table.Cell>
            <Table.Cell>
              <Text size={"1"}>{item.published_date}</Text>
            </Table.Cell>
            <Table.Cell>
              <Text size={"1"}>{item.vendor}</Text>
            </Table.Cell>
            <Table.Cell>
              <Text size={"1"}>{item.severity_level}</Text>
            </Table.Cell>
            <Table.Cell>
              <Text size={"1"} className="text-blue-500">
                <Link to={`/details/${item.id}`}>View Details</Link>
              </Text>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default All;
