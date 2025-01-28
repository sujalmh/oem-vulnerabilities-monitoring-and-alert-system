import { Table } from "@radix-ui/themes";
import { Text } from "@radix-ui/themes";
import { Link } from "react-router-dom";

const Advisories = ({ data }) => {
  
  return (
    <>
      <Table.Root>
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

        <Table.Body>
        {data.map((item, index) => {
            if (item.is_it === false) {
              return (
                <Table.Row key={index}>
                  <Table.Cell>
                    <Text size={"2"}>{item.product_name_version}</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Text size={"2"}>{item.vulnerability}</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Text size={"2"}>{item.published_date}</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Text size={"2"}>{item.vendor}</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Text size={"2"}>{item.severity_level}</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Text size={"1"} className="text-blue-500">
                      <Link to={`/details/${item.id}`}>View Details</Link>
                    </Text>
                  </Table.Cell>
                </Table.Row>
              );
            }
          })}
        </Table.Body>
      </Table.Root>
    </>
  );
};

export default Advisories;
