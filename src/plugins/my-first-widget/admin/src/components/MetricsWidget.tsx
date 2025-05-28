import { useState, useEffect } from 'react';
import { Table, Tbody, Tr, Td, Typography } from '@strapi/design-system';
import { Widget } from '@strapi/admin/strapi-admin';

import { useFetchClient } from '@strapi/strapi/admin';

import { PLUGIN_ID } from '../pluginId';
const PATH = '/count';

const MetricsWidget = () => {
  console.log('******************');
  const { get } = useFetchClient();
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState<Record<string, string | number> | null>(null);
  const [error, setError] = useState<string | null>(null);  

  useEffect(() => {
    const fetchMetrics = async () => {
 
      try {
        const { data } = await get(PLUGIN_ID + PATH);
        console.log('data:', data);

        const formattedData: Record<string, string | number> = {};
        
        if (data && typeof data === 'object') {
          await Promise.all(
            Object.entries(data).map(async ([key, value]) => {
              if (typeof value === 'function') {
                const result = await value();
                formattedData[key] = typeof result === 'number' ? result : String(result);
              } else {
                formattedData[key] = typeof value === 'number' ? value : String(value);
              }
            })
          );
        }
        
        setMetrics(formattedData);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : 'An error occurred');
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  if (loading) {
    return <Widget.Loading />;
  }

  if (error) {
    return <Widget.Error />;
  }

  if (!metrics || Object.keys(metrics).length === 0) {
    return <Widget.NoData>No content types found</Widget.NoData>;
  }

  return (
    <Table>
      <Tbody>
        {Object.entries(metrics).map(([contentType, count], index) => (
          <Tr key={index}>
            <Td>
              <Typography variant="omega">{String(contentType)}</Typography>
            </Td>
            <Td>
              <Typography variant="omega" fontWeight="bold">
                {String(count)}
              </Typography>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default MetricsWidget;
